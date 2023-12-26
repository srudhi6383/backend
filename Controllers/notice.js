const notice = require('../Models/notice')

exports.createNotice = async (req, res) => {
    try {
      const { title, body, category } = req.body;
      const notice = new Notice({ title, body, category, user: req.user._id });
      await notice.save();
  
      req.user.notices.push(notice);
      await req.user.save();
  
      res.status(201).json({ message: 'Notice created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.getAllNotices = async (req, res) => {
    try {
      const { category } = req.query;
      const filter = category ? { category } : {};
      const notices = await Notice.find(filter).populate('user', 'name');
  
      res.json(notices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.getNoticeById = async (req, res) => {
    try {
      const notice = await Notice.findById(req.params.id).populate('user', 'name');
      if (!notice) {
        return res.status(404).json({ message: 'Notice not found' });
      }
  
      res.json(notice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.updateNotice = async (req, res) => {
    try {
      const { title, body, category } = req.body;
      const notice = await Notice.findById(req.params.id);
  
      if (!notice || notice.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      notice.title = title;
      notice.body = body;
      notice.category = category;
      await notice.save();
  
      res.json({ message: 'Notice updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.deleteNotice = async (req, res) => {
    try {
      const notice = await Notice.findById(req.params.id);
  
      if (!notice || notice.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      await notice.remove();
  
      res.json({ message: 'Notice deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };