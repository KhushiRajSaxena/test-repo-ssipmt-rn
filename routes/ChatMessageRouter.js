var express = require("express");
const { sendMessage, getMessageListBySessionName } = require("../data-access/ChatDao");
var router = express.Router();



// Send a message to a session named -> sessionName
const sendMessageToSessionRouter = async (req, res, next) => {
	try {
    const {sessionName} = req.params;
		const {userName, ts, message, replyTo } = req.body;
		if (!sessionName) {
			res.status(400).json({ err: "invalid session name" });
			return;
		}
		if (!ts) {
			res.status(400).json({ err: "invalid ts" });
			return;
		}
		if (!message) {
			res.status(400).json({ err: "invalid message" });
			return;
		}
		if (!userName) {
			res.status(400).json({ err: "invalid userName" });
			return;
		}
    console.log(sessionName)
		const response = await sendMessage({
			sessionName,
			userName,
      message,
			ts,
			replyTo,
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json("error while sending message")
    return;
	}
};


const getMessagesBySessionNameRouter = async (req, res, next) => {
  try {
    const {sessionName} = req.params;
    const response = await getMessageListBySessionName({sessionName});
    res.status(200).json(response);
  } catch(error) {
    res.status(400).json("error while getting messages")
    return;
  }
}


router.post("/:sessionName", sendMessageToSessionRouter);
router.get("/:sessionName", getMessagesBySessionNameRouter);
module.exports = router;