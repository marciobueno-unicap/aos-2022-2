import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll({
    attributes: ["id", "text", "userId"],
  });
  return res.send(messages);
});

router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );
  return res.send(message);
});

router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.delete("/:messageId", async (req, res) => {
  console.log("req.params.messageId", req.params.messageId);
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });
  console.log("result", result);
  return res.send(!!result);
});

export default router;
