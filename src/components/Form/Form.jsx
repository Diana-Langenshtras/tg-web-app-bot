import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [knowledge_level, setLevel] = useState('');
   const {tg} = useTelegram();

   const onSendData = useCallback(() => {
       const data = {
           name,
           surname,
           knowledge_level
       }
       tg.sendData(JSON.stringify(data));
     //  Telegram.WebApp.sendData(new Date().toString());
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [name, surname, knowledge_level])

   useEffect(() => {
       tg.onEvent('mainButtonClicked', onSendData)
       return () => {
           tg.offEvent('mainButtonClicked', onSendData)
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [onSendData])

   useEffect(() => {
       tg.MainButton.setParams({
           text: 'Отправить данные'
       })
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
       if(!street || !country) {
           tg.MainButton.hide();
       } else {
           tg.MainButton.show();
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [country, street])

   const onChangeName = (e) => {
       setName(e.target.value)
   }

   const onChangeSurname = (e) => {
       setSurname(e.target.value)
   }

   const onChangeLevel = (e) => {
       setLevel(e.target.value)
   }

   return (
       <div className={"form"}>
           <h3>Введите ваши данные</h3>
           <input
               className={'input'}
               type="text"
               placeholder={'Имя'}
               value={country}
               onChange={onChangeName}
           />
           <input
               className={'input'}
               type="text"
               placeholder={'Фамилия'}
               value={street}
               onChange={onChangeSurname}
           />
           <h3>Оцените уровень знаний по пятибалльной шкале</h3>
           <select value={subject} onChange={onChangeLevel} className={'select'}>
               <option value={'1'}></option>
               <option value={'2'}></option>
               <option value={'3'}></option>
               <option value={'4'}></option>
               <option value={'5'}></option>
           </select>
       </div>
   );
};

export default Form;