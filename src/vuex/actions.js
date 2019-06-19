import {
    onLogin,

    getCouList,
    deleteCou,
    AddCou,
    EditCou,

    getEleList,
    deleteEle,
    AddEle,

    getWatList,
    AddWat,
    EditWat,
    deleteWat,

    getStuList,
    AddStu,
    EditStu,
    deleteStu,

    getClubMemberList,
    EditClubMemInfo,
    getClubNameList,
    getClubPositionList
} from '../api'



export default {
    // login
    async onLogin({
        commit
    }, {
        username,
        password
    }) {
        const response = await onLogin(username, password)
        if (response.code === 0) sessionStorage.setItem('token', response.data.token)
        commit(SET_GLOBAL_MESSAGE, response)
    },

    //显示课程
    async getCouList({
        commit
    }, {

    }) {
        return await getCouList({

        })
    },

    //课程添加
    async AddCou({
        commit
    }, {
        id,
        name,
        period,
        credit,
        compulsory,
        offlineTeach
    }) {
        return await AddCou({
            id,
            name,
            period,
            credit,
            compulsory,
            offlineTeach
        })
    },

    //课程修改
    async EditCou({
        commit
    }, {
        id,
        name,
        period,
        credit,
        compulsory,
        offlineTeach
    }) {
        return await EditCou({
            id,
            name,
            period,
            credit,
            compulsory,
            offlineTeach
        })
    },

    //课程删除
    async deleteCou({
        commit
    }, {
        id
    }) {
        return await deleteCou({
            id
        })
    },

    // 用电查询
    async getEleList({
        commit
    }, {
        elePlace,
        eleMonth,
        eleYear,
        elePlaceType
    }) {
        return await getEleList({
            elePlace,
            eleMonth,
            eleYear,
            elePlaceType
        })
    },

    // 用电添加
    async AddEle({
        commit
    }, {
        elePlace,
        eleQuantity,
        eleMonth,
        eleYear,
        elePlaceType
    }) {
        return await AddEle({
            elePlace,
            eleQuantity,
            eleMonth,
            eleYear,
            elePlaceType
        })
    },

    // 用电删除
    async deleteEle({
        commit
    }, {
        eleId
    }) {
        return await deleteEle({
            eleId
        })
    },

    // 用水查询
    async getWatList({
        commit
    }, {
        watPlace,
        watMonth,
        watYear,
        watPlaceType
    }) {
        return await getWatList({
            watPlace,
            watMonth,
            watYear,
            watPlaceType
        })
    },

    // 用水添加
    async AddWat({
        commit
    }, {
        watPlace,
        watQuantity,
        watMonth,
        watYear,
        watPlaceType
    }) {
        return await AddWat({
            watPlace,
            watQuantity,
            watMonth,
            watYear,
            watPlaceType
        })
    },

    // 用水修改
    async EditWat({
        commit
    }, {
        watId,
        watPlace,
        watQuantity,
        watMonth,
        watYear,
        watPlaceType
    }) {
        return await EditWat({
            watId,
            watPlace,
            watQuantity,
            watMonth,
            watYear,
            watPlaceType
        })
    },

    // 用水删除
    async deleteWat({
        commit
    }, {
        watId
    }) {
        return await deleteWat({
            watId
        })
    },

    // 学生信息查询
    async getStuList({
        commit
    }, {
        id
    }) {
        return await getStuList({
            id
        })
    },

    // 学生信息添加
    async AddStu({
        commit
    }, {
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
    }) {
        return await AddStu({
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
        })
    },

    // 学生信息修改
    async EditStu({
        commit
    }, {
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
    }) {
        return await EditStu({
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
        })
    },

    // 删除学生信息
    async deleteStu({
        commit
    }, {
        id
    }) {
        return await deleteStu({
            id
        })
    },

    
    // 社团成员信息查询
    async getClubMemberList({
        commit
    }, {
        studentId
    }) {
        return await getClubMemberList({
            studentId
        })
    },

    // 社团成员信息修改
    async EditClubMemInfo({
        commit
    }, {
        id,
        clubId,
        clubPositionId
    }) {
        return await EditClubMemInfo({
            id,
            clubId,
            clubPositionId
        })
    },

    // 显示社团编号
    async getClubNameList({
        commit
    }, {
        clubStatus
    }) {
        return await getClubNameList({
            clubStatus
        })
    },

    // 显示社团职位
    async getClubPositionList({
        commit
    }, {
        
    }) {
        return await getClubPositionList({
            
        })
    },

}