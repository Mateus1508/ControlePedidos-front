'use client'

import React from 'react';
import { AiOutlineShoppingCart, AiOutlineDelete } from 'react-icons/ai';
import Styles from './request.module.css';
import { api } from '../../services/api';

const RequestItem = () => {
    const [pedidoById, setPedidoById] = React.useState([]);
    const [pedidos, setPedidos] = React.useState([]);
    const [newPedido, setNewPedido] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [newItem, setNewItem] = React.useState([]);

    React.useEffect(() => {
        setNewItem({ ...newItem, pedidoId: pedidoById.id });
    }, [items])

    React.useEffect(() => {
        api.get('pedidos')
            .then(res => setPedidos(res.data))
            .catch(error => window.alert(error.response.data))
    }, [pedidos])

    const handlePostRequest = async () => {

        await api.post('/pedidos', newPedido)
            .then(res => {
                return window.alert(`Pedido ${res.data.descricao} adicionado com sucesso`);
            })
            .catch(error => {
                return window.alert('Erro', error.message);
            });
    }

    const handleSubmitItem = async (e) => {
        e.preventDefault();
        await api.post('/itens', newItem)
            .then(res => {
                window.alert('Adicionado com sucesso');
                setNewItem([]);
                setPedidoById([]);
            })
            .catch(error => window.alert(error.response.data));
    }

    const handleGetPedidoById = async (id) => {
        await api.get(`/pedidos/${id}`)
            .then(res => {
                setPedidoById(res.data);
                handleGetItemsByPedidoId(res.data.id)
            })
            .catch(error => {
                if (error.message) {
                    return window.alert(error.response.data);
                }
                else {
                    return window.alert('Erro', error.message);
                }
            })
    }

    const handleGetItemsByPedidoId = async (pedidoId) => {
        await api.get(`/itens/${pedidoId}`)
            .then(res => setItems(res.data))
            .catch(error => {
                if (error.message) {
                    return window.alert(error.response.data);
                }
                else {
                    return window.alert('Erro', error.message);
                }
            })
    }

    const handleDeleteRequest = async (id) => {
        await api.delete(`/pedidos/${id}`)
            .then(res => window.alert(res.data))
            .catch(error => {
                if (error.message) {
                    return window.alert(error.response.data);
                }
                else {
                    return window.alert('Erro', error.message);
                }
            })
    };

    return (
        <div>
            {
                !pedidoById.id ?
                    <div>
                        <section className={Styles.inputPedido}>
                            <h2>Criar um pedido</h2>
                            <label htmlFor="">Descrição</label>
                            <input type="text" onChange={e => setNewPedido({ ...newPedido, descricao: e.target.value })} />
                            <button onClick={handlePostRequest}>Criar</button>
                        </section>
                        <h2>Pedidos</h2>
                        <section className={Styles.tableContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Identificador</th>
                                        <th>Descrição</th>
                                        <th>Valor total</th>
                                        <th>Ver</th>
                                        <th>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pedidos.map((pedido) => {
                                            return (
                                                <tr key={pedido.id}>
                                                    <td>{pedido.id}</td>
                                                    <td>{pedido.identificador}</td>
                                                    <td>{pedido.descricao}</td>
                                                    <td>{pedido.valorTotal}</td>
                                                    <td><AiOutlineShoppingCart color='green' className={Styles.icon} onClick={() => handleGetPedidoById(pedido.id)} /></td>
                                                    <td><AiOutlineDelete color='red' className={Styles.icon} onClick={() => handleDeleteRequest(pedido.id)} /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>
                    </div>
                    :
                    <div>
                        <section>
                            <h2>{pedidoById.descricao ? pedidoById.descricao : 'Sem descrição'}</h2>
                            <form onSubmit={handleSubmitItem} className={Styles.form}>
                                <label htmlFor="">Id do produto</label>
                                <input type="text" onChange={e => setNewItem({ ...newItem, produtoId: parseInt(e.target.value) })} />
                                <label htmlFor="">Quantidade</label>
                                <input type="text" onChange={e => setNewItem({ ...newItem, quantidade: parseInt(e.target.value) })} />
                                <label htmlFor="">Valor</label>
                                <input type="text" onChange={e => setNewItem({ ...newItem, valor: parseInt(e.target.value) })} />
                                <button type="submit">Adicionar ao pedido</button>
                                <button type="button" onClick={() => setPedidoById([])}>Voltar</button>
                            </form>
                        </section>
                        <h2>Itens do pedido</h2>
                        <section className={Styles.tableContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nome do Produto</th>
                                        <th>Quantidade</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.produto.nome}</td>
                                                    <td>{item.quantidade}</td>
                                                    <td>{item.valor}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>
                    </div>
            }

        </div>
    );
}

export default RequestItem;