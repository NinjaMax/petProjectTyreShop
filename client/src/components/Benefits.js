import React from 'react';
import '../css/Benefits.css';
import onlineSupport from '../assets/icons/onlineSupport100.png';
import fastDelivery from '../assets/icons/fastDelivery100.png';
import handShake from '../assets/icons/handshake100.png';

const Benefits = () => {
    return (
        <div>
            <div className='benefitsBox'>
                <div className="containerBenefit">
                    <img src={onlineSupport} alt="OnlineSupport"/>
                    <span>Допомога єкспертів</span> <p/> Кваліфікована та швидка допомога єкспертів.
                    Допомога в підборі, допомога в оформленні замовлення.
                </div>

                <div className="containerBenefit">
                    <img src={fastDelivery} alt="FastDelivery" />
                    <p><span >Оперативна доставка</span> Доставка різними перевізниками: Нова Пошта, САТ, Укр Пошта</p>
                    <p>Самовивіз зі складу обо курєрська доставка.</p>
                </div>
                <div className="containerBenefit">
                    <img src={handShake} alt="Handshake" />
                    <p><span >Нам довіряють.</span> Партнерські відносини з прямими постачальниками.</p>
                    <p>Позитивні відгуки користувачів.</p>
                </div>
            </div>
        </div>

    );
};

export default Benefits;