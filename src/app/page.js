"use client"

import Head from "next/head";
import {useState} from 'react';
import { doLogin } from "@/services/Web3Services";
import {useRouter}from 'next/navigation';

export default function Home() {

  const {push} = useRouter();

  const [message, setMessage] = useState("Hello World");

  function btnLoginClick(){
    doLogin().then(account => push('/vote'))
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
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://s2.glbimg.com/vCCgk3bXif5ktCosWPG8MjyU8Jg=/1280x720/s3.glbimg.com/v1/AUTH_180b9dd048d9434295d27c4b6dadc248/media_kit/1e/06/49474c6d5734460a3155f5face0b.png" className="d-block mx-lg-auto img-fluid" width="700" height="500" alt="logo" />
          </div>
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Webbb3</h1>
                <p className="lead">Votação on-chain do BBB.</p>
                <p className="lead mb-3">Autentique-se com sua carteira e deixe seu voto para o próximo paredão</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" onClick={btnLoginClick} className="btn btn-primary btn-lg px-4"> 
                    <img src="/public/brand-resources-master/SVG/SVG_MetaMask_Vertical_White.svg" width="100" className="me-3" alt="" />
                    Conectar MetaMask
                </button>
              </div>
              <p className="message">{message}</p>
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
