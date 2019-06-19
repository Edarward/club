import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '呵呵'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    'age|18-23': 1,
    sex: Mock.Random.integer(0, 1),
    major: Mock.Random.string(1,10),
    depart: Mock.Random.string(1,10),
    term: Mock.Random.string(1,10),
    year: Mock.Random.string(1,10),
    role: Mock.Random.string(1,10),
  }));
}

export { LoginUsers, Users };
