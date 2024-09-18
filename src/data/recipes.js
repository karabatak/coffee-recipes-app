// src/data/recipes.js

const recipes = [
    {
      id: 1,
      name: 'Espresso',
      image: 'https://ideacdn.net/idea/bs/42/myassets/blogs/espresso-2awfexj-2.jpg?revision=1686819714',
      description: 'Koyu kavrulmuş kahve çekirdeklerinden elde edilen yoğun aromalı kahve.',
      ingredients: ['7g ince öğütülmüş kahve'],
      preparation: 'Espresso makinesinde 25-30 saniyede hazırlanır.'
    },
    {
      id: 2,
      name: 'Latte',
      image: 'https://ideacdn.net/idea/li/11/myassets/blogs/blog-10.jpg?revision=1674214100',
      description: 'Espresso ve buharda ısıtılmış süt ile yapılan yumuşak içimli kahve.',
      ingredients: ['1 shot espresso', '250ml buharda ısıtılmış süt', '2cm süt köpüğü'],
      preparation: 'Espresso üzerine buharda ısıtılmış süt eklenir ve üstüne süt köpüğü konur.'
    },
    {
      id: 3,
      name: 'Cappuccino',
      image: 'https://cdn.yemek.com/mnresize/1250/833/uploads/2024/03/cappuccino-nedir-nasil-yapilir-one-cikan.jpg',
      description: 'Eşit oranlarda espresso, buharda ısıtılmış süt ve süt köpüğü içerir.',
      ingredients: ['1 shot espresso', '60ml buharda ısıtılmış süt', '60ml süt köpüğü'],
      preparation: 'Espresso üzerine buharda ısıtılmış süt ve süt köpüğü eklenir.'
    },
    {
      id: 4,
      name: 'Americano',
      image: 'https://i.nefisyemektarifleri.com/2023/04/27/americano-kahve-nedir-nasil-yapilir-9-faydasi.jpg',
      description: 'Espresso üzerine sıcak su eklenerek hazırlanır.',
      ingredients: ['1 shot espresso', 'Sıcak su'],
      preparation: 'Espresso fincanına sıcak su eklenir.'
    },
    {
      id: 5,
      name: 'Mocha',
      image: 'https://lh6.googleusercontent.com/proxy/xvH5Bup3Y4LXs28d28kfhj9emuORvJ9WBShMOek65HCFYTTB1nob3JxGzXFtqVCaOfnKmc7s0UM0C5zts0C-pFe_lmJqp8aK3gTWEuYCYEBUNrKq_GJiwLqNvfAehdK_',
      description: 'Espresso, çikolata şurubu ve süt ile yapılan tatlı bir kahve.',
      ingredients: ['1 shot espresso', '30ml çikolata şurubu', '240ml buharda ısıtılmış süt', 'Krem şanti (isteğe bağlı)'],
      preparation: 'Espresso ve çikolata şurubu karıştırılır, üzerine süt eklenir.'
    },
    {
      id: 6,
      name: 'Macchiato',
      image: 'https://i.nefisyemektarifleri.com/2023/04/28/macchiato-nedir-nasil-yapilir-icilir.jpg',
      description: 'Espresso üzerine az miktarda süt köpüğü eklenerek yapılır.',
      ingredients: ['1 shot espresso', '1-2 çay kaşığı süt köpüğü'],
      preparation: 'Espresso üzerine süt köpüğü eklenir.'
    },
    {
      id: 7,
      name: 'Flat White',
      image: 'https://www.foodandwine.com/thmb/xQZv2CX6FO5331PYK7uGPF1we9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Flat-White-FT-BLOG0523-b11f6273c2d84462954c2163d6a1076d.jpg',
      description: 'Espresso ve mikroköpüklü süt ile yapılan yoğun aromalı kahve.',
      ingredients: ['2 shot espresso', 'Mikroköpüklü buharda ısıtılmış süt'],
      preparation: 'Espresso üzerine mikroköpüklü süt eklenir.'
    },
    {
      id: 8,
      name: 'Ristretto',
      image: 'https://mocacocoffee.com/cdn/shop/articles/bir-fincan-ristretto-262031_1200x801.jpg?v=1680592021',
      description: 'Espressoya göre daha az su ile hazırlanan yoğun kahve.',
      ingredients: ['7g ince öğütülmüş kahve'],
      preparation: 'Espresso makinesinde daha kısa sürede (15-20 saniye) hazırlanır.'
    },
    {
      id: 9,
      name: 'Lungo',
      image: 'https://i.nefisyemektarifleri.com/2023/05/02/lungo-kahve-nedir-nasil-yapilir-icilir.jpg',
      description: 'Espressoya göre daha fazla su ile hazırlanan hafif kahve.',
      ingredients: ['7g ince öğütülmüş kahve'],
      preparation: 'Espresso makinesinde daha uzun sürede (45-60 saniye) hazırlanır.'
    },
    {
      id: 10,
      name: 'Cortado',
      image: 'https://cahveland.com/wp-content/uploads/2020/09/cortado-kahve-nedir-nasil-yapilir.jpg',
      description: 'Eşit oranlarda espresso ve sıcak süt içerir.',
      ingredients: ['1 shot espresso', '1 shot sıcak süt'],
      preparation: 'Espresso ve sıcak süt karıştırılır.'
    }
  ];
  
  export default recipes;
  