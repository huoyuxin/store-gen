use for: auto generate action\reducer\effects\service

cli: node_modules/store-gen/index.js a src/app/lesson-detail/lesson-comment/store/store.config.json

config: 
{
  "page": "lesson card",
  "actions": [
    {
      "description": "get list",
      "http": {
        "method": "get",
        "url": "/tutor-student-episode/win/lessons/${lessonId}/card-records",
        "description": "获取收到的所有卡片"
      },
      "param": {
        "name": "lessonId",
        "type": "number",
        "description": "课程id"
      },
      "response": {
        "name": "tags"
      }
    },
    {
      "description": "set read",
      "http": {
        "method": "post",
        "url": "/tutor-student-episode/win/lessons/${lessonId}/read-card",
        "description": "标记卡片已读"
      },
      "param": {
        "name": "lessonId",
        "type": "number"
      }
    },
    {
      "description": "show all",
      "trigger": "if card.unread.length >0, action read card"
    },
    {
      "description": "download"
    },
    {
      "description": "update page",
      "param": {
        "name": "index",
        "type": "number"
      }
    }
  ]
}
