import {Sequelize} from "sequelize"

const sequelize= new Sequelize('app_pagos','root','clave',{
    host:'localhost',
    dialect:"mysql"
})

export default sequelize