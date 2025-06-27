# 前端 VUE 上機測驗

## 介面需求

1. 課程列表
   - 課程名稱
   - 開課狀態
   - 縮圖
   - 單價
   - 加入購物車按鈕(開課狀態：尚未開始時不能加入購物車)
2. 購物車頁(呈現已加入購物車的商品數)
   - 縮圖＋課程名稱＋單價＋刪除按鈕(單項刪除＋多選刪除)
   - 總計金額
   - 確認按鈕
3. 導航列
   - 前面兩頁的換頁連結

## 條件

1. 資訊串接資料
   `https://script.google.com/macros/s/AKfycbyGmoZukCQze0nw3UF-VX9ELODVy5Rs6CIQ1U-YbwNHfG3JIjGz4JThKAvWJB1P0qTg/exec`

   獲取的資料會像是

   ```javascript
   ;[
     {
       id: '1758051268318220289',
       name: '狂美《久石讓的燦爛樂章》交響音樂會-2024再現',
       displayCategory: '音樂',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1710929296686xSXZ4TpVh3.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1730000000,
       price: 2200,
       ageRestriction: '7歲以上',
       status: '已開始',
     },
     {
       id: '1784862638494830592',
       name: '2024 馬辛－龍之聲世界巡演台灣站',
       displayCategory: '音樂',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1714967180923XS2gISJhI3.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 2500,
       ageRestriction: '4歲以上',
       status: '已開始',
     },
     {
       id: '1772170841003401217',
       name: '躍演《勸世三姊妹》中文音樂劇',
       displayCategory: '戲劇',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1714449616854Zyw4J4CGoH.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 3600,
       ageRestriction: '12歲以上',
       status: '已開始',
     },
     {
       id: '1782384429793337345',
       name: '面粉趴2024夏',
       displayCategory: '戲劇',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/17146397582702RN8zIwyTo.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 1000,
       ageRestriction: '輔15級',
       status: '尚未開始',
     },
     {
       id: '1783015237651550209',
       name: '音樂劇《跑跑殭丙仁》',
       displayCategory: '戲劇',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1715127950033jbYDDq1I6V.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1730000000,
       price: 2000,
       ageRestriction: '6歲以上',
       status: '已結束',
     },
     {
       id: '1771072679226855425',
       name: '聞笛',
       displayCategory: '音樂',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1711588445650rd86vj6XhI.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 300,
       ageRestriction: '普遍級',
       status: '已開始',
     },
     {
       id: '1606151416662671362',
       name: '親子音樂劇《阿甯咕又闖禍了YA~》小兒子動畫劇場 ①',
       displayCategory: '親子',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/17092736496549f700TXn8s.png',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 1600,
       ageRestriction: '4歲以上',
       status: '尚未開始',
     },
     {
       id: '1770728060409761793',
       name: '福爾摩沙合唱團三十週年藝文推廣系列音樂會之一',
       displayCategory: '音樂',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1712140373140AHiTWOMyUu.png',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 1000,
       ageRestriction: '普遍級',
       status: '尚未開始',
     },
     {
       id: '1782976868097384449',
       name: '【歌仔戲】秀琴歌劇團《黃金美人島》《陳守娘傳奇》《薛平貴與王寶釧》',
       displayCategory: '戲劇',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1713929677527H0jPoCnUnx.jpeg',
       startDateTime: 1730000000,
       endDateTime: 1730000000,
       price: 1200,
       ageRestriction: '7歲以上',
       status: '已結束',
     },
     {
       id: '1783060649972731905',
       name: '歡聲歌唱．快樂向前-台北愛樂少年及兒童合唱團夏日音樂會',
       displayCategory: '音樂',
       imageUrl: 'https://s3.resource.opentix.life/upload/program/1714033221285WTINSAGHgC.jpeg',
       startDateTime: 1720000000,
       endDateTime: 1720000000,
       price: 150,
       ageRestriction: '普遍級',
       status: '已開始',
     },
   ]
   ```

2. 使用 Tailwind CSS，呈現樣式請自由發揮，需包含響應式
3. 請使用元件化概念實作
