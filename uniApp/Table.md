# Mine

### 用户信息表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   ID      |   string  |   用户id  |
|   Name    |   String  |   用户名  |
|   Password|   String  |   密码    |
|   Email   |   String  |   邮箱    |
|   Phone   |   String  |   电话    |
|   Sex     |   String  |   性别    |
|   motto   |   String  |   座右铭  |     
|   Date    |   String  |   创建日期 |
|   HeadImg |   String  |   头像    |
----------------------------------------------------------------
### 主页表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   UserID    |   String  |   用户id    |
|   HeadImg |   String  |   头像    |
|   signature |   String  |   签名    |
|   WorkCount  |   Number  |   作品数   |
|   DayCount    |  Number  |    天数    |
|    FriendsCount  | Number  |   好友数  |
|   FanCount    |   Number  |   获赞数  |
---------------------------------------
### 好友关系表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   UserID      |   string  |   用户id  |
|   FriendID    |   String  |   朋友id  |
|   Relationship|   Number  |   关系    |  

<!-- //单向朋友关系
设 ID	user_id	friend_id
    1	    1	    2           
    2	    2	    1           
    3	    3	    3       互相粉
//第一项：b是a的朋友 第二项：a是b的朋友 -->
--------------------------------


### 作品表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   WorkID    |   String  |   作品id  |
|   UserID      |   string  |   用户id  |
|   BkImg     | string |  背景图片    |
|   Text    | string |     文本     |
|   Date  |   String  |   创作日期    |
|  Weather  |   number | 天气   |
|   Feel    |   number  |   心情   |
|   tzImg1      |   number |   贴纸no.1图片|
|   tzImgx1      |   number |   贴纸no.1位置x|
|   tzImgy1      |   number |   贴纸no.1位置y|
|   tzImgs1      |   number |   贴纸no.1缩放|
|   tzImg2      |   number |   贴纸no.2图片|
|   tzImgx2      |   number |   贴纸no.2位置x|
|   tzImgy2      |   number |   贴纸no.2位置y|
|   tzImgs2      |   number |   贴纸no.2缩放|
|   tzImg3      |   number |   贴纸no.3图片|
|   tzImgx3      |   number |   贴纸no.3位置x|
|   tzImgy1      |   number |   贴纸no.3位置y|
|   tzImgs3      |   number |   贴纸no.3缩放|
|   tzImg4      |   number |   贴纸no.4图片|
|   tzImgx4      |   number |   贴纸no.4位置x|
|   tzImgy4      |   number |   贴纸no.4位置y|
|   tzImgs4      |   number |   贴纸no.4缩放|
### 评论表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   WorkID    |   String  |   作品id  |
|   UserID      |   string  |   用户id  |
|   content     |string     |   评论    |
### 背景图表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   BcImgID  |   String  |   背景图片id    |
|   BcImgName   |   String  |   背景图片名  |
|   BcImgPath   |   String  |   背景图片路径  |

### 勋章表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   medalID  |   String  |   勋章id    |
|   medalName   |   String  |   勋章名  |
|   medalPath   |   String  |   勋章路径  |


### 作品贴纸表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   tzID  | String    |   贴纸ID  | 
|   tzName |   String  |   贴纸名    |
|   tzPath  |   string   | 贴纸路径 |


### 事务表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   Userid    |   String   |  用户id |   |
|   workid    |   String  | 事务id  |
|   time       |   String  |    时间 |
|   status  |   Number  |   事务完成状态   |
|   title   |   String  |  标题 |
|  content  |   string  |   事务内容  |


### 课表表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   Userid    |   String   |  用户id    |
|   classNumber1    |   String  |  课表1学号    |
|   classNumber2    |   String  |  课表2学号    |
|   classNumber3    |   String  |  课表3学号    |
|   classNumber4    |   String  |  课表4学号    |
|   classNumber5    |   String  |  课表5学号    |
|   classNumber6    |   String  |  课表6学号    |
|   className1  |   String  |  课表1姓名    |
|   className2  |   String  |  课表2姓名    |
|   className3  |   String  |  课表3姓名    |
|   className4  |   String  |  课表4姓名    |
|   className5  |   String  |  课表5姓名    |
|   className6  |   String  |  课表6姓名    |
|   classPath1    |   String  |   课表1  |
|   classPath2    |   String  |   课表2  |
|   classPath3    |   String  |   课表3  |
|   classPath4    |   String  |   课表4  |
|   classPath5    |   String  |   课表5  |
|   classPath6    |   String  |   课表6  |


### 计划表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   Userid    |   String   |  用户id    |
|   planid     |   String  |     计划id   |
|   startTime   |   String  |   起始时间    |
|   endTime | String |  末尾时间    |
|   content |   String  |   内容    |
| title |   String  |   标题    |

### 记录表
|   Table   |   Type    |    Des    |
|   -----   |   :---:   |   :---:   |
|   Userid    |   String   |  用户id    |
|   recordid    |   String  |   记录id  |
| time | String |   记录的时间  |

























