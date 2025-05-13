import OSS from 'ali-oss';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI5t6rSaHTvV6tiUhaFJiq',
  accessKeySecret: 'j4Ra6JQ4E2QTUnbBkvumfmFOXWxYtC',
  bucket: 'hyzhu-oss',
});

export const uploadMiddleware = upload.single('file');

export const uploadToOss = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const fileName = `category-covers/${Date.now()}-${originalname}`;

    const result = await client.put(fileName, buffer);
    res.json({ url: result.url });
  } catch (error) {
    res.status(500).json({ message: '上传失败', error: error.message });
  }
};
