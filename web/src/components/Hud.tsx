import { useState } from "react";
import "./Hud.css";
import { debugData } from "../utils/debugData";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { animateNumber } from "../utils/animateNumber";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

type UserStats = {
  hp: number;
  armour: number;
  micActive: boolean;
};

type VehicleStats = {
  speed: number;
  gear: number;
  fuel: number;
  seatbeltOn: boolean;
};

type frameworkStats = {
  hunger: number;
  thirst: number;
  stress: number;
};

type userInfo = {
  cash: number;
  bank: number;
  dirty_cash: number;
  job: string;
  society_money: number | string;
};

const Hud: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [vehHud, setVehVisiblity] = useState(false);
  const [framework, setframework] = useState(false);
  const [id, setid] = useState(false);
  const [seatbelt, setSeatbelt] = useState(false);
  const [stress, setStress] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(false);
  const [stressValue, setStressValue] = useState(0);
  const [micActive, setMicActive] = useState(0);
  const [cash, setCash] = useState(0);
  const [bank, setBank] = useState(0);
  const [dirtyCash, setDirtyCash] = useState<any>(null);
  const [society_money, set_society_money] = useState<any>(null);
  const [user_job, setUserJob] = useState("Job");
  const [userId, setUserId] = useState("");

  // Options
  useNuiEvent("setVisible", setVisible);
  useNuiEvent("framework", setframework);
  useNuiEvent("id", setid);
  useNuiEvent("stress", setStress);
  useNuiEvent("seatbelt", setSeatbelt);
  useNuiEvent("setUserId", setUserId);
  useNuiEvent("displayBalance", setDisplayBalance);
  useNuiEvent("setVehV", setVehVisiblity);

  // Debug
  useNuiEvent("debug", (data) => {
    console.log(JSON.stringify(data));
  });

  useNuiEvent<UserStats>("hudStats", (retData) => {
    const userHealth = document.getElementById(
      "user-health"
    ) as HTMLSpanElement;
    const userArmour = document.getElementById(
      "user-armour"
    ) as HTMLSpanElement;
    const micStatus = document.getElementById("mic") as HTMLLIElement;
    // Health
    var health = Math.floor(retData.hp / 2);
    animateNumber(userHealth, health, "%");

    // Armour
    animateNumber(userArmour, retData.armour, "%");

    // Mic
    if (retData.micActive) {
      setMicActive(100);
    } else if (!retData.micActive) {
      setMicActive(0);
    }
  });

  useNuiEvent<VehicleStats>("vehHud", (retData) => {
    const mph = document.getElementById("mph") as HTMLSpanElement;
    const gear = document.getElementById("gear") as HTMLSpanElement;
    const fuel = document.getElementById("fuel") as HTMLSpanElement;
    const seatBelt = document.getElementById("seatbelt") as HTMLLIElement;

    if (seatbelt && retData.seatbeltOn) {
      seatBelt.style.color = "green";
    } else if (seatbelt && !retData.seatbeltOn) {
      seatBelt.style.color = "red";
    }
    // MPH Text
    // mph.textContent = ` ${speed} MP/H`;
    animateNumber(mph, retData.speed, " MP/H");

    // Gear
    gear.textContent = ` Gear ${retData.gear}`;
    // Fuel
    // fuel.textContent = `${retData.fuel}%`;
    animateNumber(fuel, retData.fuel, "%");
  });

  useNuiEvent<frameworkStats>("frameworkStatus", (data) => {
    const userHunger = document.getElementById(
      "user-hunger"
    ) as HTMLSpanElement;
    const userThirst = document.getElementById(
      "user-thirst"
    ) as HTMLSpanElement;

    // animateNumber(userStress, data.stress, "%");
    setStressValue(data.stress);

    animateNumber(userHunger, data.hunger, "%");

    animateNumber(userThirst, data.thirst, "%");
  });

  useNuiEvent<userInfo>("userInfo", (data) => {
    setCash(data.cash);
    setBank(data.bank);
    if (data.dirty_cash) {
      setDirtyCash(data.dirty_cash);
    }
    if (data.society_money) {
      set_society_money(data.society_money);
    }
    setUserJob(data.job);
  });

  return (
    <>
      {/* Hud */}
      {displayBalance && (
        <div
          className="flex items-end border-black align-top flex-col gap-2 text-center mt-10 uppercase"
          style={{ visibility: visible ? "visible" : "hidden" }}
        >
          <p className="p-2 bg-black rounded font-bold mr-5 w-64">
            <i className="fa-solid fa-money-check-dollar text-green-500"></i>{" "}
            <span className="ml-2" id="cash">
              ${cash}
            </span>
          </p>
          <p className="p-2 bg-black rounded font-bold mr-5 w-64">
            <i className="fa-solid fa-credit-card text-blue-500"></i>
            <span className="ml-2" id="bank">
              ${bank}
            </span>
          </p>
          {dirtyCash && (
            <>
              <p className="p-2 bg-black rounded font-bold mr-5 w-64">
                <i className="fa-solid fa-money-bill text-red-600"></i>
                <span className="ml-2" id="black_cash">
                  ${dirtyCash}
                </span>
              </p>
            </>
          )}
          <p className="p-2 bg-black rounded font-bold mr-5 w-64">
            <i className="fa-solid fa-user"></i>
            <span className="ml-2" id="job">
              {user_job}
            </span>
          </p>
          {society_money && (
            <>
              <p className="p-2 bg-black rounded font-bold mr-5 w-64">
                <i className="fa-solid fa-briefcase-blank text-red-600"></i>
                <span className="ml-2" id="black_cash">
                  ${society_money}
                </span>
              </p>
            </>
          )}
        </div>
      )}
      <div
        className="ui"
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        <div className="health">
          <div className="flex gap-2 justify-center align-center mt-4 text-center">
            <p className="font-bold bg-black p-2 rounded wid">
              <i className="fa-solid fa-heart text-red-500"></i>{" "}
              <span id="user-health"> 0%</span>
            </p>
            <p
              className="font-bold bg-black p-2 rounded wid"
              style={{ display: framework ? "block" : "none" }}
            >
              <i className="fa-solid fa-burger text-yellow-500"></i>{" "}
              <span id="user-hunger"> 100%</span>
            </p>
            <div className="flex flex-col gap-1 justify-center items-center w-10 bg-black rounded">
              <i className="fa-solid fa-microphone mt-1" id="mic"></i>
              <div
                className="text-center bg-cyan-400 max-h-1 h-1/3 rounded"
                style={{
                  maxWidth: "2rem",
                  width: `${micActive}%`,
                  transition: "width 0.3s ease-in-out",
                }}
              ></div>
            </div>
            {stress && (
              <>
                <div className="flex flex-col gap-1 justify-center transition items-center w-10 bg-black rounded">
                  <i className="fa-solid fa-brain mt-1" id="mic"></i>
                  <div
                    className="text-center bg-red-600 transition max-h-1 h-1/3"
                    style={{
                      maxWidth: "2rem",
                      width: `${stressValue}%`,
                      transition: "width 0.3s ease-in-out",
                    }}
                  ></div>
                </div>
              </>
            )}
            <p
              className="font-bold bg-black p-2 rounded wid"
              style={{ display: framework ? "block" : "none" }}
            >
              <i className="fa-solid fa-droplet text-blue-600"></i>{" "}
              <span id="user-thirst"> 100%</span>
            </p>
            <p className="font-bold bg-black p-2 rounded wid">
              <i className="fa-solid fa-shield-alt text-blue-500"></i>{" "}
              <span id="user-armour"> 0%</span>
            </p>
          </div>
        </div>
      </div>

      {/* CarHud */}
      <div
        className="centerig"
        style={{ visibility: vehHud && visible ? "visible" : "hidden" }}
      >
        <div
          className={`grid ${
            id && seatbelt ? "grid-cols-3" : id ? "grid-cols-2" : "grid-cols-2"
          } gap-2 text-center`}
        >
          <p className="font-bold bg-black p-2 rounded">
            <i className="fa-solid fa-gauge text-purple-500"></i>{" "}
            <span id="mph">0 MP/H</span>
          </p>
          <p className="font-bold bg-black p-2 rounded">
            <i className="fa-solid fa-gears text-gray-500"></i>{" "}
            <span id="gear"> Gear 1</span>
          </p>
          {id && (
            <p className="font-bold bg-black p-2 rounded smallIcons">
              <i className="fa-solid fa-id-badge"></i>
              <span id="userId"> ID: {userId}</span>
            </p>
          )}
          <p
            className={`font-bold bg-black p-2 rounded ${
              id && seatbelt ? "col-span-2" : "col-span-1"
            }`}
          >
            <i className="fa-solid fa-gas-pump text-white"></i>{" "}
            <span id="fuel">0%</span>
          </p>
          {seatbelt && (
            <p className="font-bold bg-black p-2 rounded">
              <i
                className="fa-solid fa-user-slash text-red-500"
                id="seatbelt"
              ></i>
            </p>
          )}
        </div>
      </div>
      {/* ID Without CarHud */}
      {id && !vehHud && (
        <div
          className="id w-24 text-center"
          style={{ visibility: visible ? "visible" : "hidden" }}
        >
          <p className="font-bold bg-black p-2 rounded smallIcons">
            <i className="fa-solid fa-id-badge"></i>
            <span id="userId"> ID: {userId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Hud;
