'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(1);
  const [intervalText, setIntervalText] = useState(1);
  const [isStartInterval, setIsStartInterval] = useState(false);
  const [isStartText, setIsStartText] = useState(false);
  const [idWord, setIdWord] = useState(0);
  const [words, setWords] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleFileUpload = () => {
    setIsStartInterval(!isStartInterval)
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setText(text)
      }
      reader.onerror = (error) => {
        console.error("Ошибка при загрузке файла: ", error);
      }
      reader.readAsText(selectedFile);
    } else {
      alert('Выберите файл для загрузки!');
    }
  }

  const changeSpeed = () => speed < 5 ? setSpeed(() => speed + 1) : setSpeed(1)

  useEffect(() => {
    if (isStartInterval) {
      let intervalId = null;
      if (intervalText > 0) {
        intervalId = setInterval(() => {
          setIntervalText((prev) => prev - 1);
        }, 1000);
      } else if (intervalId) {
        clearInterval(intervalId);
      }
      else {
        setIntervalText("Начали!")
        setTimeout(() => {
          setIntervalText("")
          setIsStartInterval(!isStartInterval)
          setIsStartText(!isStartText)
        }, 1000)
      }
      return () => clearInterval(intervalId);
    }
   }, [intervalText, isStartInterval]);

   useEffect(() => {
    if (isStartText) {
      let intervalId = setInterval(() => {
        setIdWord((prev) => {
          if (prev < words.length - 1) { 
            return prev + 1; 
          } else {
            return prev;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId); 
    }
   }, [isStartText, words]);

  return (
    <div className="Home">
      <div className="flex flex-row w-full p-10 bg-gray-950 text-white">
        <span className="basis-1/2 text-xl pt-2">Speed Reader</span>
        <div className="basis-1/2 text-right">
          <button type="button" onClick={changeSpeed} className="bg-zinc-50 p-2 px-10 text-black pb-3 text-xl rounded">
            Скорость: {speed}
          </button>
        </div>
      </div>
      <main className="w-full text-center">
        <div className="mt-100">
        <button type="button" onClick={handleFileUpload} className="bg-gray-950 p-2 px-10 text-white text-xl rounded hover:bg-gray-800 transition">
          <div className="flex text-center">
            <span>Загрузить текст</span>
            <span className="mt-1 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
              <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </span>
          </div>
        </button>
        <input type="file" className="mx-10 m-5 w-80" onChange={handleFileChange}/>
        <h1 className="text-4xl m-10">
          { isStartInterval ? intervalText : text}
        </h1>
        </div>
      </main>
    </div>
  );
}
