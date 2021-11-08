'use strict';
const request = require('supertest');
const {topsecret:server} = require('./app');
const assert = require('assert');
  
describe('Esto va testear el POST de /topsecret', () => {
    it('Prueba de mensajes sin determinar "No es posible determinar el mensaje" ', async () => {
        let data={
            satellites:[
                {
                    name:"kenobi",
                    distance:727.02,
                    message:["este","","","mensaje","","secreto"]
                },
                {
                    name:"skywalker",
                    distance:893.91,
                    message:["","es","","","secreto"]
                },
                {
                    name:"sato",
                    distance:1280.31,
                    message:["este","","un","",""]
                }
            ]
        }
        const expectedResult={
            name: "MessageError",
            status: 404,
            message: "No es posible determinar el mensaje"
          }
        await request(server)
            .post('/topsecret')
            .send(data)
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(404)
            .expect(expectedResult)
              .expect(response => {
                  if(response) return assert.ok(response)
                assert.ok();
                
              });
    });

    it('Prueba para determinar mensaje y posición "este es un mensaje secreto" ', async () => {
        let data={
            "satellites":[
                    {
                        "name":"kenobi",
                        "distance":"727.02",
                        "message":["este","","","mensaje",""]
                    },
                    {
                        "name":"skywalker",
                        "distance":"893.91",
                        "message":["","es","","","secreto"]
                    },
                    {
                        "name":"sato",
                        "distance":"1280.31",
                        "message":["este","","un","",""]
                    }
                ]
            }
        const expectedResult={
            "position": {
              "x": -300.58,
              "y": -899.13
            },
            "message": "este es un mensaje secreto"
          }
        await request(server)
            .post('/topsecret')
            .send(data)
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(200)
            .expect(expectedResult)
              .expect(response => {
                  if(response) return assert.ok(response)
                assert.ok();
                
              });
    });

    it('Prueba no se puede determinar posicion "No es posible encontrar la posición" ', async () => {
        let data={
            "satellites":[
                    {
                        "name":"kenobi",
                        "distance":"100.0",
                        "message":["este","","","mensaje",""]
                    },
                    {
                        "name":"skywalker",
                        "distance":"115.5",
                        "message":["","es","","","secreto"]
                    },
                    {
                        "name":"sato",
                        "distance":"142.7",
                        "message":["este","","un","",""]
                    }
                ]
            }
        const expectedResult={
            "name": "LocationError",
            "status": 404,
            "message": "No es posible encontrar la posición"
          }
        await request(server)
            .post('/topsecret')
            .send(data)
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(404)
            .expect(expectedResult)
              .expect(response => {
                  if(response) return assert.ok(response)
                assert.ok();
                
              });
    });
    it('Prueba de validacion de esquema "No hay suficientes datos para proporcionar informacion" ', async () => {
        let data={
            "satellites":0
            }
        const expectedResult={
            "name": "ValidationError",
            "status": 404,
            "message": "No hay suficientes datos para proporcionar informacion"
          }
        await request(server)
            .post('/topsecret')
            .send(data)
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(404)
            .expect(expectedResult)
              .expect(response => {
                  if(response) return assert.ok(response)
                assert.ok();
              });
    });
})

describe('Esto va testear el POST GET de /topsecret_split',()=>{
    it('Prueba de mensaje y distancia son correctas  se espera "este es un mensaje secreto" ', async () => {
        let data={
            "distance":"727.02",
	        "message":["este","es","un","mensaje","secreto"]
        }
        const expectedResult={
            "position": {
                "x": -300.58,
                "y": -899.13
                },
                "message": "este es un mensaje secreto"
            }
        await request(server)
            .post('/topsecret_split/kenobi')
            .send(data)
            .set("Accept","application/json")
            .expect("Content-Type",/json/)
            .expect(200)
            .expect(response => {
                if(response) return assert.ok(response)
                assert.ok();
            });
        });
        it('Validacion de objeto body de POST se espera "No hay suficientes datos para proporcionar informacion" ', async () => {
            let data={
                "satellites":0
            }
            const expectedResult={
                "name": "ValidationError",
                "status": 404,
                "message": "No hay suficientes datos para proporcionar informacion"
                }
            await request(server)
                .post('/topsecret_split/kenobi')
                .send(data)
                .set("Accept","application/json")
                .expect("Content-Type",/json/)
                .expect(404)
                .expect(response => {
                    if(response) return assert.ok(response)
                    assert.ok();
                });
            });
        it('Validacion de objeto name del GET se espera html "Pagina no encontrada" ', async () => {
            let data={
                "distance":"727.02",
                "message":["este","es","un","mensaje","secreto"]
            }
            const expectedResult={
                "name": "ValidationError",
                "status": 404,
                "message": "No hay suficiente información"
                }
            await request(server)
                .post('/topsecret_split/')
                .send(data)
                .set("Accept","text/html; charset=utf-8")
                .expect("Content-Type",/html/)
                .expect(404)
                .expect(response => {
                    if(response) return assert.ok(response)
                    assert.ok();
                });
            });
})

