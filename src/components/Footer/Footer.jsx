import React from "react";
import amazonPay from "./../../assets/images/amazon-pay.png";
import americanExpress from "./../../assets/images/American-Express-Color.png";
import masterCard from "./../../assets/images/mastercard.webp";
import payPal from "./../../assets/images/paypal.png";
import appleStore from "./../../assets/images/get-apple-store.png";
import googlePlay from "./../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-gray-50 flex justify-center">
      <div className="px-8 py-5 container">
        <h3 className="capitalize text-3xl text-gray-500">
          get the freshCart app
        </h3>
        <p className="text-gray-400 mb-3 mt-1">
          We will send you a link, open it on your mobile phone to download the
          app.
        </p>

        <form className="flex items-center">
          <input
            type="email"
            id="app-download"
            className="outline-green-400 transition-all ms-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5"
            placeholder="Email..."
            required
          />

          <button
            type="submit"
            className="capitalize transition-all py-2.5 px-3 ms-2 me-6 w-3xs text-center text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 rounded-lg border border-blue-400  focus:ring-3 focus:outline-none focus:ring-blue-300"
          >
            Get App Link
          </button>
        </form>

        <div className="flex flex-col gap-5 md:flex-row justify-between my-8 border-y-1 border-gray-200 py-6 px-4">
          <div className="flex items-center justify-start space-x-3">
            <p className="capitalize text-gray-600">payment partners</p>
            <div className="img w-[2.2rem]">
              <img src={amazonPay} alt="" className="w-full" />
            </div>
            <div className="img w-[2.2rem]">
              <img src={americanExpress} alt="" className="w-full" />
            </div>
            <div className="img w-[2.2rem]">
              <img src={masterCard} alt="" className="w-full" />
            </div>
            <div className="img w-[2.2rem]">
              <img src={payPal} alt="" className="w-full" />
            </div>
          </div>

          <div className="flex items-center justify-start space-x-3">
            <p className="capitalize text-gray-600">
              get deliveries with freshcart
            </p>

            <a href="https://www.apple.com/eg/app-store/">
              <div className="img w-[6rem]">
                <img src={appleStore} alt="" className="w-full" />
              </div>
            </a>

            <a href="https://play.google.com/store/games?hl=en">
              <div className="img w-[6.8rem]">
                <img src={googlePlay} alt="" className="w-full" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
