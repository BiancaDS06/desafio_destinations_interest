import styles from '../styles/Destinations.module.css';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type contriesResponse = {
    code: string;
    name: string;
    name_ptbr: string;
};

type citiesResponse = {
    id: number;
    code: string;
    name_ptbr: string;
};

function Destinations() {

    const {register, handleSubmit} = useForm();
    
    const onSubmit = (e: any) => {
        console.log(e)
        Swal.fire({
            icon: 'success',
            title: 'Destino de interesse enviado com sucesso',
            showConfirmButton: false,
            timer: 1500
          });

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
                <a href='https://github.com/'><img src="./Senhor-Viagens.png" alt="logoDestino"/></a>
                <h1>Destinos de interesse</h1>
            </div>
        </header>

        <main className={styles.mainRegister}>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col card p-4">
                    <h5 className="mb-3">Dados pessoais</h5>
                    <div className="mb-3">
                        <label className="form-label data-company">Nome</label>
                        <input className="form-control" type="text" {...register("name")} placeholder='digite seu nome' />
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">E-mail</label>
                        <input className="form-control" type="text" {...register("email")} placeholder='fulano@email.com' />
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">Telefone</label>
                        <InputMask className="form-control" type="text" {...register("phone")}  placeholder="(00) 00000-0000" mask='(99) 99999-9999' ></InputMask>
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">CPF</label>
                        <InputMask className="form-control" type="text" {...register("cpf")}  placeholder="000.000.000-00" mask='999.999.999-99' ></InputMask>
                    </div>
                </div>

                <span className={styles.lineOne}></span>

                <div className="col card p-4">
                    <h3 className="mb-3">Destinos de interesse</h3>
                    <div className="mb-3">
                        <label className="form-label data-company">País</label>
                        <select {...register("country")} className="form-select data-company" >
                            <option value="0">Selecione o país</option>
                            {countries.map((country) => (
                                <option  value={country.code}>
                                {country.name_ptbr}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label data-company">Cidade</label>
                        <select {...register("city")} className="form-select data-company" >
                            <option value="0">Selecione a cidade</option>
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
                </div>
            </form>
        </main>

    </div>
        
    )
}

export default Destinations;