"use client";
import {useState,useEffect,ChangeEvent} from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function NumberGuessing(): JSX.Element {
const [gameStarted,setGameStarted]=useState<boolean>(false)
const [gameover,setGameOver]=useState<boolean>(false)
const [paused,setPaused]=useState<boolean>(false)
const [targetNumber,setTargetNumber]=useState<number>(0)
const [userGuess,setUserGuess]=useState<number|string>("")
const [attempts,setAttempts]=useState<number>(0)
const [feedBack,setFeedBack]=useState<string>("")


useEffect(()=>{
    if(gameStarted && !paused){
        const randomNumber=Math.floor(Math.random()*10)+1;
        setTargetNumber(randomNumber)
    }
},[gameStarted,paused])

const handleStart=():void=>{
    setGameStarted(true);
    setGameOver(false)
    setPaused(false)
    setAttempts(0)
    
}

const handlePause=():void=>{
    setPaused(true)
}

const handleResume=():void=>{
setPaused(false);
}

const handleGuess=():void=>{
if(typeof userGuess==="number" ){
if(userGuess===targetNumber){
setFeedBack("Congratulation!You guessed right")
setGameOver(true)

}else{
    setAttempts(attempts+1)
    setFeedBack(userGuess>targetNumber?"Too high!":"Too low!")
}  
} else {
    setFeedBack("Please enter a valid number.");
  }
}

const handleTryAgain=():void=>{
setGameOver(false)
setGameStarted(false)
setUserGuess("")
setAttempts(0)
}

const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
  const value=  e.target.value;
  if(value===""){
    setUserGuess("")
  }else{
    const guess:number=parseInt(value)
    if(!isNaN(guess)){
if(guess>=1 && guess<=10){
    setUserGuess(guess)
}else{
    setFeedBack("Please enter number between 1 to 10")
}
    }
  }
  };
return(
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
<h2 className="text-center font-bold text-4xl mb-2">Number Guessing Game</h2>
<p className="text-center">Try to guess the number between 1 and 10!</p>
{!gameStarted && (
    <div className="flex justify-center">
        <Button
        onClick={handleStart}
        className="bg-black text-white px-3 py-2 rounded hover:bg-gray-700 mt-2 font-bold">
            Start Game
        </Button>
    </div>
)}
{gameStarted && !gameover && (
    <div>
        <div className="flex justify-center mb-4">
            {paused?(
            <Button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleResume}>
                Resume
            </Button>):(
                <Button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={handlePause}>
                    Pause
                </Button>
            )}
        </div>
        <div className="flex justify-center mb-4">
<Input value={userGuess}
placeholder="Enter your guess"
onChange={handleUserGuessChange}
className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"/>
<Button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
onClick={handleGuess} disabled={paused}>Guess
</Button>
        </div>
        <div className="text-center text-black">
            <p>Attempt: {attempts}</p>
            {feedBack&&<p> {feedBack}</p>}
        </div>
    </div>
)}
{gameover &&(
    <div>
        <div className="text-center text-black mb-4">
        <h2 className="font-bold text-2xl">Game Over</h2>
        {feedBack&&<p> {feedBack}</p>}
        <p>You guessed in {attempts} attempts</p>

        </div>
        <div className="flex justify-center">
         <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
         onClick={handleTryAgain}>Try again</Button>
        </div>
    </div>
)}
        </div>
    </div>
    </>
)
}