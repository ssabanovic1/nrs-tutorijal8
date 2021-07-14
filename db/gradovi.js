var knex = require("./knex");

function createGrad(grad){
    return knex("gradovi").insert(grad);
};

function getAllGradovi(){
    return knex("gradovi").select("*");
};

function getGrad(id){
    return knex("gradovi").where("id",id).select("*");
};

function deleteGrad(id){
    return knex("gradovi").where("id",id).del();
};

function updateGrad(id,grad){
    return knex("gradovi").where("id",id).update(grad);
};

function deleteAll(){
    return knex("gradovi").del();
}

module.exports = {
    createGrad,
    getAllGradovi,
    getGrad,
    deleteGrad,
    updateGrad,
    deleteAll
}