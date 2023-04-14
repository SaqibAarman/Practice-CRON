//const { getData } = require("../Controller/basicController");
const express = require("express");
const cron = require("node-cron");
//const nodemailer = require("nodemailer");
const axios = require("axios");

const router = express.Router();

router.post("/schedule", (req, res) => {
  try {
    // let d = new Date();
    // let mins = d.getMinutes();
    // let date = d.getDate();
    // let hours = d.getHours();
    // let month = d.getMonth();

    // cron.schedule(
    //   ` ${mins + 1} ${hours} ${date} ${month + 1}`,
    //   () => {
    //     console.log(`Task Completed at ${hours} : ${mins + 1}`);
    //   } /* ,
    //   {
    //     scheduled: true,
    //     timezone: "Asia/Kolkata",
    //   } */
    // );

    cron.schedule("*/10 * * * * *", () => {
      console.log("TASKS STARTING EVERY ---> 10 Secs ");
      //sendEmail();
      getData();
    });

    // const sendEmail = () => {
    //   let mailTransporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: "saqibahmedaarhan@gmail.com",
    //       pass: "lgftwhwipdzzffqw",
    //     },
    //   });

    //   let mailDetails = {
    //     from: "saqibahmedaarhan@gmail.com",
    //     to: "saqib.ahmed@classicinformatics.com",
    //     subject: "TESTING CRON JOBS EMAIL...",
    //     text: "Node.js Cron Job Email" + " Testing for Practice",
    //     html: "<b>Hello USER ?</b>",
    //   };

    //   mailTransporter.sendMail(mailDetails, (err) => {
    //     if (err) {
    //       console.log("Error Occurred", err);
    //     } else {
    //       console.log("Email Sent SuccessFully...");
    //     }
    //   });
    // };

    const getData = async () => {
      const urlParam =
        "https%3A%2F%2Fau.indeed.com%2Fjobs%3Fq%3DBusiness%2520Analyst%26l%3DSydney%2520NSW%26from%3DsearchOnHP%26vjk%3Db01cf4e7705e1db8";
      const data = await axios
        .get(
          `https://api.diffbot.com/v3/list?token=9824b399ffb2c30129f03eed50279344&url=${urlParam}`
        )
        .then((response) => {
          //console.log(response)
          let data = response.data.objects;
          console.log(data[0].items, "[][]");
        });

      return data;
    };

    res.status(201).json({ msg: " MAIL SENT... " });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
