const express = require('express')
const noticeController = require('../Controllers/notice')
const authMiddleware = require('../Middlewares/auth')
const notice = require('../Models/notice')

const router = express.Router()
router.use(authMiddleware)
router.post('/', noticeController.createNotice),
router.get('/', noticeController.getAllNotices),
router.get('/', noticeController.getNoticeById),
router.put('/', noticeController.updateNotice),
router.delete('/', noticeController.deleteNotice)

module.exports= router
