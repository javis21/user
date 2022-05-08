// const question = {
//     list: `SELECT * FROM question`,
// };



const question = {
    listNist: `SELECT * FROM questions2 `,
    questionNist: (id)=>{
        return `SELECT * FROM questions2 WHERE questions2.id=${id}`
    },
    editNist: (data)=>{
        console.log(data);

        return `UPDATE questions2 SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions2.id=${data.id}`
    },

    deleteNist: (id)=>{
        return `DELETE FROM questions2  WHERE questions2.id=${id}`
    },

    addNist: (data)=>{
        return `INSERT INTO questions2
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    },

    list: `SELECT * FROM questions `,
    question: (id)=>{
        return `SELECT * FROM questions WHERE questions.id=${id}`
    },

    question2: (id)=>{
        return `SELECT * FROM questions2 WHERE questions2.id=${id}`
    },



    edit: (data)=>{
        console.log(data);

        return `UPDATE questions SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions.id=${data.id}`
    },


    edit2: (data)=>{
        console.log(data);

        return `UPDATE questions2 SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions2.id=${data.id}`
    },

    delete: (id)=>{
        return `DELETE FROM questions  WHERE questions.id=${id}`
    },

    delete2: (id)=>{
        return `DELETE FROM questions2  WHERE questions2.id=${id}`
    },

    add: (data)=>{
        return `INSERT INTO questions
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    },

    add2: (data)=>{
        return `INSERT INTO questions2
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    }
}
module.exports = question;

