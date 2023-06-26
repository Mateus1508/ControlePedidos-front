'use client'

import { api } from '@/services/api';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import Styles from './table.module.css';
import React from 'react';

const ProductsTable = () => {
    const [products, setProducts] = React.useState();
    const [editForm, setEditForm] = React.useState({});
    const [newForm, setNewForm] = React.useState({});
    const [showEdit, setShowEdit] = React.useState(false);
    React.useEffect(() => {
        api.get('/produtos')
            .then((res) => {
                setProducts(res.data);
            })
    }, [products]);

    const handleGetId = (id) => {
        api.get(`/produtos/${id}`)
            .then((res) => {
                setEditForm(res.data);
                setShowEdit(!showEdit);
            })
            .catch(error => {
                if (error.message) {
                    return window.alert(error.response.data);
                }
                else {
                    return window.alert('Erro', error.message);
                }
            });
    }

    const handleSubmitExistingProduct = async (e) => {
        e.preventDefault();
        await api.put(`/produtos/${editForm.id}`, editForm)
            .then(res => window.alert('Atualizado com sucesso!'))
            .catch(error => {
                if (error.message) {
                    setShowEdit(!showEdit);
                    return window.alert(error.response.data);
                }
                else {
                    return window.alert('Erro', error.message);
                }
            })
    }

    const handleSubmitNewProduct = async (e) => {
        e.preventDefault();
        await api.post(`/produtos`, newForm)
            .then(res => {
                window.alert('Adicionado com sucesso!');
                setShowEdit(!showEdit);
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

    const handleDeleteProduct = async (id) => {
        await api.delete(`/produtos/${id}`)
            .then(res => window.alert(res.data))
            .catch(error => {
                if (error.message) {
                    setShowEdit(!showEdit);
                    return window.alert(error.response.data);
                }
                else {
                    return window.alert('Erro', error.message);
                }
            })
    };

    const handleTreatCategory = (categoria) => {
        if (categoria == 0) {
            return 'Perecível';
        }
        else if (categoria == 1) {
            return 'Não perecível'
        }
    }

    return (
        <div className={Styles.container}>
            {
                showEdit ?
                    <section className={Styles.inputBox}>
                        <form action="" className={Styles.form} onSubmit={handleSubmitExistingProduct}>
                            <h3>Editar produto</h3>
                            <label htmlFor="">Nome</label>
                            <input
                                type="text"
                                value={editForm.nome}
                                onChange={e => setEditForm({ ...editForm, nome: e.target.value })}
                            />
                            <label htmlFor="">Categoria</label>
                            <select value={editForm.categoria} onChange={e => setEditForm({ ...editForm, categoria: parseInt(e.target.value) })}>
                                <option value="0">Perecível</option>
                                <option value="1">Não Perecível</option>
                            </select>
                            <section className={Styles.btnBox}>
                                <button type="submit">Confirmar</button>
                                <button type="button" onClick={() => setShowEdit(false)}>Cancelar</button>
                            </section>
                        </form>
                    </section>
                    :
                    <form className={Styles.form} onSubmit={handleSubmitNewProduct}>
                        <h3>Adicionar produto</h3>
                        <label htmlFor="">Nome</label>
                        <input
                            type="text"
                            value={newForm.nome}
                            onChange={e => setNewForm({ ...newForm, nome: e.target.value })}
                        />
                        <label htmlFor="">Categoria</label>
                        <select value={newForm.categoria} onChange={e => setNewForm({ ...newForm, categoria: parseInt(e.target.value) })}>
                            <option value="0">Perecível</option>
                            <option value="1">Não Perecível</option>
                        </select>
                        <section className={Styles.btnBox}>
                            <button type="submit">Criar</button>
                        </section>
                    </form>
            }
            <h2>Produtos</h2>
            <section className={Styles.tableContainer}>
                <table className={Styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nome}</td>
                                    <td>{handleTreatCategory(product.categoria)}</td>
                                    <td><AiFillEdit color='yellow' className={Styles.icon} onClick={() => handleGetId(product.id)} /></td>
                                    <td><AiOutlineDelete color='red' className={Styles.icon} onClick={() => handleDeleteProduct(product.id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ProductsTable;