import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Footer from './components/common/Footer';
import Fullnews from './pages/Fullnews';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import News from './pages/News';
import Contact from './pages/Contact';
import Category from './pages/category'
import About from './pages/About';
import Search from './pages/Search';
import CreatePost from './pages/CreatePost';
import Page404 from './pages/Page404';
import UpdatePost from './pages/Edit';
import { MenuContextProvider } from './context/MenuBarContext';
import {UserContextProvider} from './context/user';
import ScrollToTop from './components/Sroll';


function App() {


  return (
    <UserContextProvider>
      <MenuContextProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/post/:postId' element={<Fullnews />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/news' element={<News />} />
            <Route path='/newpost' element={<CreatePost />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/search/:query' element={<Search />} />
            <Route path='/Edit/:postId' element={<UpdatePost />} />
            <Route path='/category/:category' element={<Category />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MenuContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
