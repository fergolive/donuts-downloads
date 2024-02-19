import { Router } from "express";
import {
  downloadVideo, videoInfo, welcome, downloadAudio
} from "../controllers/download.controller.js";

const router = Router();

router.post("/info", videoInfo);
router.get("/download", downloadVideo);
router.get("/download-audio",downloadAudio)
router.get("/", welcome);


export default router;