import styles from '../styles/Destinations.module.css';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2';
import contriesResponse from '../models/countriesResponse';
import citiesResponse from '../models/citiesResponse';
import userData from '../models/userData';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    cpf: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
});

function Destinations() {

    const {register, handleSubmit, reset} = useForm<userData>({ resolver: yupResolver(schema) });
    
    const onSubmit = (e: userData) => {
        console.log(e);
        Swal.fire({
            icon: 'success',
            title: 'Destino de interesse enviado com sucesso',
            showConfirmButton: false,
            timer: 1500
          });
          reset();
        

    }

    const [countries, setCountries] = useState<contriesResponse[]>([]);
    useEffect(() => {
        axios.get('https://amazon-api.sellead.com/country').then(response => {
            setCountries(response.data);
        })
    }, []);

    const [cities, setCities] = useState<citiesResponse[]>([]);
    useEffect(() => {
        axios.get('https://amazon-api.sellead.com/city').then(response => {
            setCities(response.data);
        })
    }, []);


    return (
    <div>
        <header className={styles.headerDashboard}>
            <div className={styles.headerDestinationsLogo}>
                <img src="./Senhor-Viagens.png" alt="logoDestino"/>
                <h1>Destinos de interesse</h1>
            </div>
        </header>

        <main className={styles.mainRegister}>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col card p-4">
                    <h5 className="mb-3">Dados pessoais</h5>
                    <div className="mb-3">
                        <label className="form-label data-company">Nome</label>
                        <input className="form-control" type="text" {...register("name", { required: true })} placeholder='digite seu nome' required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">E-mail</label>
                        <input className="form-control" type="email" {...register("email", { required: true })} placeholder='fulano@email.com' required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">Telefone</label>
                        <InputMask className="form-control" type="text" {...register("phone", { required: true })}  placeholder="(00) 00000-0000" mask='(99) 99999-9999' required></InputMask>
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">CPF</label>
                        <InputMask className="form-control" type="text" {...register("cpf", { required: true })}  placeholder="000.000.000-00" mask='999.999.999-99' required></InputMask>
                    </div>
                </div>

                <span className={styles.lineOne}></span>

                <div className="col card p-4">
                    <h5 className="mb-3">Destinos de interesse</h5>
                    <div className="mb-3">
                        <label className="form-label data-company">País</label>
                        <select {...register("country", { required: true })} className="form-select data-company" required>
                            <option value="">Selecione o país</option>
                            {countries.map((country) => (
                                <option  value={country.code}>
                                {country.name_ptbr}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">Cidade</label>
                        <select {...register("city", { required: true })} className="form-select data-company" required>
                            <option value="">Selecione a cidade</option>
                            {cities.map((city) => (
                                <option value={city.name_ptbr}>
                                {city.name_ptbr}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.btnSend} >
                    <button className="btn btn-primary" type="submit">Enviar</button>
                    <input type="reset" className='btn btn-primary' value="Limpar formulário"/>
                </div>
            </form>
        </main>

    </div>
        
    )
}

export default Destinations;