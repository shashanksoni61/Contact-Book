import ContactFilter from '../Contacts/ContactFilter';
import ContactForm from '../Contacts/ContactForm';
import Contacts from '../Contacts/Contacts';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
