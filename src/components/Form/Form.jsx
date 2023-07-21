import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [knowledge_level, setLevel] = useState('1');
   const {tg} = useTelegram();

   const onSendData = useCallback(() => {
       const data = {
           name,
           surname,
           knowledge_level
       }
      // eslint-disable-next-line react-hooks/exhaustive-deps
       tg.sendData(JSON.stringify(data));
   }, [name, surname, knowledge_level, tg])

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
       if(!name || !surname || !knowledge_level) {
           tg.MainButton.hide();
       } else {
           tg.MainButton.show();
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [name, surname, knowledge_level])

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
               value={name}
               onChange={onChangeName}
           />
           <input
               className={'input'}
               type="text"
               placeholder={'Фамилия'}
               value={surname}
               onChange={onChangeSurname}
           />
           <h3>Оцените уровень знаний по пятибалльной шкале</h3>
           <select value={knowledge_level} onChange={onChangeLevel} className={'select'}>
               <option value={'1'}>Junior</option>
               <option value={'2'}>Middle</option>
               <option value={'3'}>Senior</option>
               <option value={'4'}>Expert</option>
           </select>
       </div>
   );
};

export default Form;