import multer from 'multer'
import {extname} from 'path'

const MIMETYPES = ['image/jpeg', 'image/png']

// https://github.com/Desarrollo-Util/express-multer-example/blob/main/src/index.js
export const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads',

    filename: (_req, file, cb) => {
      const fileExtension = extname(file.originalname)
      const fileName = file.originalname.split(fileExtension)[0]

      cb(null, `${fileName}-${Date.now()}${fileExtension}`)
    },
  }),

  fileFilter: (_req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true)
    else cb(null, false)
  },

  limits: {
    fieldSize: 10000000,
  },
})
