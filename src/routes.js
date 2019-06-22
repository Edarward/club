import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

import Ho from './views/Ho.vue'
import basicInfo from './components/Student/basicInfo.vue'
import studentInfo from './components/Student/studentInfo.vue'
import studentEvaluation from './components/Student/studentEvaluation.vue'


import clubActivities from './components/Association/clubActivities.vue'
import clubMembers from './components/Association/clubMembers.vue'
import clubAudit from './components/Association/clubAudit.vue'
import clubEvaluation from './components/Association/clubEvaluation.vue'
import stuGradeQuery from './components/Student/stuGradeQuery.vue'
import selCourseInfo from './components/Student/selCourseInfo.vue'
import examArrQuery from './components/Student/examArrQuery.vue'
import enquiryCourse from './components/Student/enquiryCourse.vue'
import stuEvaluate from './components/Student/stuEvaluate.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/Ho', component: Ho, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '学生管理',
        iconCls: 'fa fa-user-circle-o',//图标样式class
        children: [
            { path: '/basicInfo', component: basicInfo, name: '基本信息' },
            { path: '/studentInfo', component: studentInfo, name: '学生信息' },
            { path: '/selCourseInfo', component: selCourseInfo, name: '选课信息' },
            { path: '/examArrQuery', component: examArrQuery, name: '考试安排' },
            { path: '/enquiryCourse', component: enquiryCourse, name: '排课查询' },
            { path: '/stuGradeQuery', component: stuGradeQuery, name: '成绩查询' },
            { path: '/stuEvaluate', component: stuEvaluate, name: '学生评价' },
            { path: '/studentEvaluation', component: studentEvaluation, name: '发布评价' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '社团管理',
        iconCls: 'fa fa-suitcase',
        children: [
            { path: '/clubActivities', component: clubActivities, name: '社团活动'},
            { path: '/clubMembers', component: clubMembers, name: '成员信息' },
            { path: '/clubAudit', component: clubAudit, name: '社团审核' },
            { path: '/clubEvaluation', component: clubEvaluation, name: '社团评优' }
        ]
    },
    
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;