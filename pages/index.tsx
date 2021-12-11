/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

import Navbar from "../components/AuthNavbar.js";
import Footer from "../components/Footer.js";

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(1);

    return (
      <>
        <div className="flex items-center w-full">
          <div className="flex items-center">
            <button
              onClick={() => startMintMultiple(mintCount)}
              disabled={isMinting}
              className="px-10 get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none bg-red-500 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
            >
              {isMinting ? "Loading" : `Mint ${mintCount}`}
            </button>

            <input
              disabled={isMinting}
              type="number"
              min={1}
              max={2}
              className="mx-auto block w-1/6 px-3 py-3 border border-gray-400 rounded-md text-sm shadow-sm placeholder-gray-400"
              value={mintCount}
              onChange={(e) => setMintCount((e.target as any).value)}
            />
            <p className="mx-auto text-lg">Max 2 you can mint</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>

      <Navbar transparent />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px bg-white">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">

              <div className="py-16">
                <h1 className="text-red-500 font-bold text-6xl">
                  Mint Your RobotS Now!
                </h1>

                <div className="flex flex-col items-center min-h-full">
                  <Toaster />
                  <div className="flex items-center w-full mt-3">
                    <div className="flex items-center">
                      {connected && (
                        <div className="flex items-end mr-2">
                          <p className="text-2xl text-gray-800 font-bold mr-1">Your Balance</p>
                          <p className="text-2xl text-gray-800 mx-1 font-bold">
                            {balance.toFixed(2)}
                          </p>
                          <p
                            className="text-2xl font-bold text-transparent bg-clip-text"
                            style={{
                              backgroundImage: `linear-gradient(to bottom right, #00FFA3, #03E1FF, #DC1FFF)`,
                            }}
                          >
                            SOL
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center w-full mt-3">
                    <div className="flex items-center">
                      {connected && (
                        <p className="text-sm text-center">
                          <span className="font-bold text-gray-800 text-lg mr-5">Available: {nftsData.itemsRemaining}</span>
                          <span className="font-bold text-gray-800 text-lg mr-5">Minted: {nftsData.itemsRedeemed}</span>
                          <span className="font-bold text-gray-800 text-lg mr-5">Total: {nftsData.itemsAvailable}</span>


                        </p>
                      )}
                    </div>
                  </div>


                  <div className="flex items-start w-full my-5">
                    {connected ? (
                      <>
                        {new Date(mintStartDate).getTime() < Date.now() ? (
                          <>
                            {isSoldOut ? (
                              <p className="text-gray-800 text-2xl font-bold">SOLD OUT</p>
                            ) : (
                              <>

                                <div className="flex flex-col w-full">
                                  <MintMany />
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <Countdown
                            date={mintStartDate}
                            onMount={({ completed }) => completed && setIsMintLive(true)}
                            onComplete={() => setIsMintLive(true)}
                          />
                        )}
                      </>
                    ) : (
                      <p className="text-gray-800 font-semibold text-3xl">Connect Wallet to Mint</p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <h2 className="text-gray-800 text-2xl font-bold">My NFTs</h2>
                    <div className="flex mt-3 gap-x-2">
                      {(nfts as any).map((nft: any, i: number) => {
                        return <AnNFT key={i} nft={nft} />;
                      })}
                    </div>
                  </div>
                </div>


              </div>

            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="https://demos.creative-tim.com/notus-nextjs/img/pattern_nextjs.png"
          alt="..."
        />
      </section>

      <main>
        <section className="relative py-20">


          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-200">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">A growing company</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    The extension comes with three pre-built pages to help you
                    get started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>





      </main>
      <Footer />

      <Head>
        <title>Mint Your RobotS</title>
        <meta
          name="description"
          content="Simplified NextJs with typescript example app integrated with Metaplex's Candy Machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>


    </>
  );
}
