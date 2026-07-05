export const ContactsRoute = () => {
    return (

        <div className='contactCard'>
            <h3 className='contactTitle'>Администратор</h3>
            <ul className='contactList'>
                <li className='contactItem'><span className='label'>Телефон:</span>
                    <a
                        href="tel:+79161234567"
                        className='value'
                    >
                        +7 (916) 123-45-67
                    </a></li>
                <li className='contactItem'><span className='label'>Эл. адрес:</span>
                    <a
                        href="mailto:test@yandex.ru"
                        className='value'
                    >
                        test@yandex.ru
                    </a></li>
            </ul>
        </div>

    )
}