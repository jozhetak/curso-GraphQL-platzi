const {makeExecutableSchema, addMockFunctionToSchema} = require('graphql-tools')

const datos = require('./datos_ejemplo')

const typeDefs = `
	union ResultadoBusqueda= Profesor | Curso
	
	#Esto es un curso en el sistema
	type Curso {
		id: ID!
		titulo: String!
		#Esta es una breve descripcion del curso
		descripcion: String!
		profesor: Profesor
		rating: Float @deprecated(reason: "no creemos más en los puntajes")
		comentarios: [Comentario]
	}

	type Profesor {
		id: ID!
		nombre: String!
		nacionalidad: String!
		genero: Genero
		cursos: [Curso]
	}

	enum Genero {
		MASCULINO
		FEMENINO
	}

	type Comentario {
		id: ID!
		nombre: String!
		cuerpo: String!
	}

	type Query {
		cursos:[Curso]
		profesores: [Profesor]
		curso(id: Int): Curso
		profesor(id: Int): Profesor
		buscar: [ResultadoBusqueda]
	}
`

const resolvers = {
	Query: {
		cursos: ()=>{
			return datos.cursos
		}
	},
	
	Curso: {
		profesor: ()=>{
			return {
				nombre: "Pablo"
			}					
		}
	}
}


const schema = makeExecutableSchema({
	typeDefs,
	resolvers

})

addMockFunctionToSchema({
	schema,
	mocks: {
		Curso: function() {
			return datos.cursos[1]
		},
		Profesor: function () {
			return datos.profesores[1]
		}
	}
})

module.exports = schema