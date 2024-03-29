"use client"

import Head from "next/head";
import {useState, useEffect} from 'react';
import { getCurrentVoting, addVote } from "@/services/Web3Services";
import {useRouter} from "next/navigation"

export default function Vote() {

  const {push} = useRouter();
  const DEFAULT_OPTION = {name: "Loading....", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F1f%2F82%2Ff3%2F1f82f3e518bbcd289cc45804e566612b.jpg&f=1&nofb=1&ipt=54cb0f35a79390da134b201a8d82919b550cd683e67be8f6e40e160251019a3d&ipo=images"}

  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState({maxDate: Date.now()});
  const [option1, setOption1] = useState(DEFAULT_OPTION);
  const [option2, setOption2] = useState(DEFAULT_OPTION);
  const [showVotes, setShowVotes] = useState(0);


  useEffect(()=>{
    if(!localStorage.getItem('wallet')) return push("/")
    getCurrentVoting()
      .then(voting => {
        console.log(voting);
        setVoting(voting);
        setOption1(getOption(voting.option1));
        setOption2(getOption(voting.option2));
      })
      .catch(err =>{
        console.error(err);
        setMessage(err.message);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // function btnLoginClick(){
  //   doLogin().then(account => setMessage(account))
  //            .catch(err => {
  //               console.error(err);
  //               setMessage(err.message);
  //            })
  // }

  function getOption(option){
      switch(option){
        case "Yuri": return {name: "Yuri", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuploads.spiritfanfiction.com%2Fhistorias%2Fcapas%2F201704%2Fcoisas-aleatorias-de-pessoas-aleatorias-8603595-070420171245.jpg&f=1&nofb=1&ipt=a26f2bafd06454ccd196957745734ed1ed39e4a2c6bd0155e47c2539af492106&ipo=images"};
        case "Andrey": return {name: "Andrey", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FK9neO4_ZXpQ%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=b714f79d051a1df8bc59249b4545fe2bb438d02869e1e06f767fc0a0e71a367f&ipo=images"};
        default: return DEFAULT_OPTION;
      }
  }

  function btnVote2Click(){
    setMessage("Connect wallet... wait...");
    addVote(2)
      .then(()=>{
        setShowVotes(2);
        setMessage("Resultados parciais sujeitos a alteração minuto a minuto");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  function btnVote1Click(){
    setMessage("Connect wallet... wait...");
    addVote(1)
      .then(()=>{
        setShowVotes(1);
        setMessage("Resultados parciais sujeitos a alteração minuto a minuto");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }


  return (
    <>
      <Head>
        <title>Webbb3 | Login</title>
        <meta char-set="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="row align-items-center">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Webbb3</h1>
              <p className="lead">Votação on-chain do BBB.</p>
              {
                voting.maxDate > (Date.now() / 1000)
                ? <p className="lead mb-3"> Você tem até {new Date(Number(voting.maxDate) * 1000).toString()} para deixar seu voto em um dos participantes abaixo para que ele saia do programa</p>
                : <p className="lead mb-3"> Votação Encerrada. Confira a baixo os resultados.</p>
              }

              <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
                <div className="col-1"></div>
                <div className="col-5">
                  <h3 className="my-2 d-block mx-auto" style={{width: 250}}>
                    {voting.option2}
                  </h3>
                  <img src={option2.image} className="d-block mx-auto img-fluid rounded" width={250} height={250} />
                  <p>{
                      showVotes > 0 || voting.maxDate < (Date.now() / 1000)
                      ? <button className="btn btn-seconary p-3 my-2 d-block mx-auto" width={250} height={250} disable={true}> {showVotes === 2 ? Number(voting.votes2) + 1: Number(voting.votes2)} votos</button>
                      : <button className="btn btn-primary p-3 my-2 d-block mx-auto" width={250} height={250} onClick={btnVote2Click} >Quero que saia esse</button>
                    }</p>
                </div>

                <div className="col-5">
                  <h3 className="my-2 d-block mx-auto" style={{width: 250}}>
                    {voting.option1}
                  </h3>
                  <img src={option1.image} className="d-block mx-auto img-fluid rounded" width={250} height={250} />
                  <p>{
                      showVotes > 0 || voting.maxDate < (Date.now() / 1000)
                      ? <button className="btn btn-seconary p-3 my-2 d-block mx-auto" width={250} height={250} disable={true}> {showVotes === 1 ? Number(voting.votes1) + 1: Number(voting.votes1)} votos</button>
                      : <button className="btn btn-primary p-3 my-2 d-block mx-auto" width={250} height={250} onClick={btnVote1Click} >Quero que saia esse</button>
                    }</p>
                </div>
              </div>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center -py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Webbb3, Inc</p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"> <a href="/" className="nav-link px-2 text-body-secondary">Home</a> </li>
            <li className="nav-item"> <a href="/" className="nav-link px-2 text-body-secondary">About</a> </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
