import { Table, Button, Spin } from "antd"
import { useEffect, useState } from "react"

interface Pessoa {
    id: number
    nome: string
    cpf: string
    rg: string
    data_nasc: string
    sexo: string
}


const fetchPessoas = async (): Promise<Pessoa[]> => {
    const response = await fetch('http://localhost:3000/pessoas')
    const data = await response.json()
    return data
}

export const PessoasList = () => {
    const [users, setUser] = useState<Pessoa[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoaing] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoaing(true)
                const data = await fetchPessoas()
                setUser(data)
            } catch {
                setError(error)
            } finally {
                setLoaing(false)
            }
        }
        fetchData()
    }, [])

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key:'nome'
        },
        {
            title: "CPF",
            dataIndex: 'cpf',
            key:'cpf'
        },
        {
            title: "RG",
            dataIndex: 'rg',
            key:'rg'
        },
        {
            title: "Data de Nascimento",
            dataIndex: 'data_nasc',
            key:'data_nasc'
        },
        {
            title: "Sexo",
            dataIndex: 'sexo',
            key:'sexo'
        },
        {
            title: "Ação",
            key:'action',
            render: (text: string, record: Pessoa) => (
                <>
                    <Button type="default" onClick={()=> handleEdit(record.id)}>Editar</Button>
                    <Button type="primary" onClick={() => handleDelete(record.id)}>Excluir</Button>
                </>
            )
        },

    ]
    return (
        <>
            <Spin spinning={loading}>
                <Table<Pessoa> 
                dataSource={users}
                columns={columns}
                />
            </Spin> 
        </>   
    )
}


