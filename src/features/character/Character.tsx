import styles from "./Character.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { eat, fetchJokeAsync, selectCharacter, selectHunger, selectMoney, selectStamina, sleep, work } from "./characterSlice";

export const Character = () => {
    const {stamina, money, hunger, joke} = useAppSelector(selectCharacter);
    const dispatch = useAppDispatch();

    return (
    <>
      <div>
        <div>Stamina: {stamina}</div>
        <div>Money: {money}</div>
        <div>Hunger: {hunger}</div>
        <div>Joke: {joke}</div>
      </div>
      <div>
        <button onClick={() => dispatch(sleep())} className={styles.buttonpadding}>Sleep</button>
        <button onClick={() => dispatch(work())} className={styles.buttonpadding}>Work</button>
        <button onClick={() => dispatch(eat())} className={styles.buttonpadding}>Eat</button>
        <button onClick={() => dispatch(fetchJokeAsync())} className={styles.buttonpadding}>Get joke</button>
      </div>
    </>
    )
  }
  