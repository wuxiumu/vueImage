const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty()
const images = require('images')
const _ = require('lodash')

module.exports = {
  init(app) {
    app.get('/api/placeholders', function (req, res) {
      // 从数据库中取出数据
      var jsonFile = path.resolve(__dirname, './api.json')
      let data = JSON.parse(fs.readFileSync(jsonFile))
      res.json(data)
    })

    app.post('/api/combine', multipartyMiddleware, function (req, res) {
      const { id, avatars } = req.body
      const input = path.resolve(__dirname, '../uploads/img4.jpg')
      let handler = images(input)
      _.forEach(avatars, avatar => {
        let file = req.files[avatar.name]
        if (file) {
          handler.draw(images(file.path), +avatar.x, +avatar.y, +avatar.width, +avatar.height, +avatar.radius)
        }
      })

      //才剪完的缩略图, 横坐标, 纵坐标, 宽度, 高度
      const savedFile = +new Date() + '.jpg'
      const output = path.resolve(__dirname, '../uploads', savedFile);
      handler.save(output, {
        quality: 100
      })
      res.json({
        url: '/uploads/' + savedFile,
        success: true
      })
    })
    
    app.post('/api/save', bodyParser.json(), function (req, res) {
      let jsonFile = path.resolve(__dirname, 'api.json')
      const { positions, background, ratio, ratioWidth, ratioHeight, ratioRadius } = req.body
      let result = {
        background,
        ratio,
        positions
      }
      // 保存到数据库
      fs.writeFileSync(jsonFile, JSON.stringify(result, null, 2))
      res.json({
        success: true
      })
    })
  }
}
