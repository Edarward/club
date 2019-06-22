import fetch from './fetch'

const Local_URL= 'http://39.105.229.163:8080/api'
// 登录
export const onLogin = (username, password) => fetch.post(`${Local_URL}/adminLogin/admin/login?username=${username}&password=${password}`)


//课程显示
export const getCouList = ({
}) => fetch.get(`${Local_URL}/courseManage/selectCourse`)

//添加课程
export const AddCou = ({
    id,
    name,
    period,
    credit,
    compulsory,
    offlineTeach
}) => fetch.post(`${Local_URL}/courseManage/addCourse?id=${id}&name=${name}&period=${period}&credit=${credit}&compulsory=${compulsory}&offlineTeach=${offlineTeach}`)

//修改课程
export const EditCou = ({
    id,
    name,
    period,
    credit,
    compulsory,
    offlineTeach
}) => fetch.post(`${Local_URL}/courseManage/updateCourse?id=${id}&name=${name}&period=${period}&credit=${credit}&compulsory=${compulsory}&offlineTeach=${offlineTeach}`)

//课程删除
export const deleteCou = ({
    id
}) => fetch.post(`http://39.105.229.163:8080/api/courseManage/deleteCourse?id=${id}`)

// 用电管理

//用电查询
export const getEleList = ({
    elePlace,
    eleMonth,
    eleYear,
    elePlaceType
}) => fetch.get(`${Local_URL}/energy/selectElectricity?elePlace=${elePlace}&eleMonth=${eleMonth}&eleYear=${eleYear}&elePlaceType=${elePlaceType}`)

//添加用电
export const AddEle = ({
    elePlace,
    eleQuantity,
    eleMonth,
    eleYear,
    elePlaceType
}) => fetch.post(`${Local_URL}/energy/insertElectricity?elePlace=${elePlace}&eleQuantity=${eleQuantity}&eleMonth=${eleMonth}&eleYear=${eleYear}&elePlaceType=${elePlaceType}`)


//用电删除
export const deleteEle = ({
    eleId
}) => fetch.post(`${Local_URL}/energy/delElectricity?id=${eleId}`)


// 用水管理

//用水查询
export const getWatList = ({
    watPlace,
    watMonth,
    watYear,
    watPlaceType
}) => fetch.get(`${Local_URL}/energy/selectWater?watPlace=${watPlace}&watMonth=${watMonth}&watYear=${watYear}&watPlaceType=${watPlaceType}`)

//添加用水
export const AddWat = ({
    watPlace,
    watQuantity,
    watMonth,
    watYear,
    watPlaceType
}) => fetch.post(`${Local_URL}/energy/insertWater?watPlace=${watPlace}&watQuantity=${watQuantity}&watMonth=${watMonth}&watYear=${watYear}&watPlaceType=${watPlaceType}`)

//修改用水
export const EditWat = ({
    watId,
    watPlace,
    watQuantity,
    watMonth,
    watYear,
    watPlaceType
}) => fetch.post(`${Local_URL}/energy/updateWater?id=${watId}&watPlace=${watPlace}&watQuantity=${watQuantity}&watMonth=${watMonth}&watYear=${watYear}&watPlaceType=${watPlaceType}`)

//用水删除
export const deleteWat = ({
    watId
}) => fetch.post(`${Local_URL}/energy/delWater?id=${watId}`)

//学生信息查询
export const getStuList = ({
    id
}) => fetch.get(`${Local_URL}/Students/selectStudents?id=${id}`)

//添加学生信息
export const AddStu = ({
    id,
    name,
    grade,
    sex,
    birthday,
    nativePlace,
    idType,
    idNunber,
    phone,
    parentPhone,
    folk,
    politicalSt
}) => fetch.post(`${Local_URL}/Students/insertStudents?id=${id}&name=${name}&grade=${grade}&sex=${sex}&birthday=${birthday}&nativePlace=${nativePlace}&idType=${idType}&idNunber=${idNunber}&phone=${phone}&parentPhone=${parentPhone}&folk=${folk}&politicalSt=${politicalSt}`)

//修改学生信息
export const EditStu = ({
    id,
    name,
    grade,
    sex,
    birthday,
    nativePlace,
    idType,
    idNunber,
    phone,
    parentPhone,
    folk,
    politicalSt
})=> fetch.post(`${Local_URL}/Students/updateStudents?id=${id}&name=${name}&grade=${grade}&sex=${sex}&birthday=${birthday}&nativePlace=${nativePlace}&idType=${idType}&idNunber=${idNunber}&phone=${phone}&parentPhone=${parentPhone}&folk=${folk}&politicalSt=${politicalSt}`)

//学生信息删除
export const deleteStu = ({
    id 
}) => fetch.post(`${Local_URL}/Students/deleteStudents?id=${id}`)

//社团成员信息查询
export const getClubMemberList = ({
    studentId
}) => fetch.get(`${Local_URL}/clubNumber/selClubNumber?studentId=${studentId}`)

//修改社团成员信息
export const EditClubMemInfo = ({
    id,
    clubId,
    clubPositionId
}) => fetch.post(`${Local_URL}/clubNumber/updateClubNumber?id=${id}&clubId=${clubId}&clubPositionId=${clubPositionId}`)

// 显示社团编号
export const getClubNameList = ({
    clubStatus
}) => fetch.get(`${Local_URL}/clubNumber/selClubId?clubStatus=${clubStatus}`)

// 显示社团职位
export const getClubPositionList = ({
    
}) => fetch.get(`${Local_URL}/clubNumber/selClubPosId`)

// 添加教评信息
export const AddContent = ({
    id,
    stuId,
    stuCourseid,
    stuQuestionid,
    stuType,
    stuContent,
}) => fetch.get(`${Local_URL}/Students/insertContent?id=${id}&stuId=${stuId}&stuCourseid=${stuCourseid}&stuQuestionid=${stuQuestionid}&stuType=${stuType}&stuContent=${stuContent}`)

// 查看问题信息
export const getQuestionInfoList = ({
    
}) => fetch.get(`${Local_URL}/Students/selectQuestion`)

// 查询成绩信息
export const getGradeInfoList = ({
    gradeStuId,
    gradeMajor,
    gradeYear
}) => fetch.get(`${Local_URL}/Students/selectgrade?gradeStuId=${gradeStuId}&gradeMajor=${gradeMajor}&gradeYear=${gradeYear}`)

// 查询选课信息
export const getSelectCourseList = ({
    stuId
}) => fetch.get(`${Local_URL}/Students/selectChoo?stuId=${stuId}`)

// 查询考试信息
export const getExamInfoList = ({
    stuexamStuId
}) => fetch.get(`${Local_URL}/Students/selectStuexam?stuexamStuId=${stuexamStuId}`)

// 查询排课信息
export const getArrangeCourseList = ({
    stuId
}) => fetch.get(`${Local_URL}/Students/selectCode?stuId=${stuId}`)
