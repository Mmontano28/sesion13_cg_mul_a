// Se crea una escena, que contendrá todos nuestros elementos como objetos, cámaras y luces.
var scene = new THREE.Scene();
wireframe: false

function cubo(x, y, z, color, material, alambrado)//Funcion por la cual contiene todos los metodos para crear un cubo, con las varibales de tamaño, color, material y alambrado
{
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {

     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // Se añade un cubo a la escens
    scene.add(cube);
    return(cube);
}
function init()
//Se crea una escena, que contendrá todos nuestros elementos como objetos, cámaras y luces.
//Se crea una cámara, que define dónde estamos mirando.
 {
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

    // crea un render y establece el tamaño
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Mostrar ejes en la pantalla
    var axes = new THREE.AxesHelper(400);
    scene.add(axes);

    Cubo = [];   // Define un array unidimensional para contener los cubos

   
    //Dim=16; //Valor la inicial del cubo

    Dim = prompt("Digite el tamaño que desea para el cubo", " ejemplo. 25");//Se crea esta variable como cuadro de texto, donde al usuario le aparece un mensaje y a su vez la opcion de digitalizar un dato
    if(Dim != null)//Este if se usa para generar un cuadro de texto alerta, para dar un mensaje dependiendo lo que el usuario interactue
    {
    alert("Su numero es "+ Dim);
    }   
    else 
    {
    alert("No has escrito nada");
    }

    Angulo = prompt("Digite el ángulo que desea en grados", " ejemplo. 25");//Se crea esta variable como cuadro de texto, donde al usuario le aparece un mensaje y a su vez la opcion de digitalizar un dato
    if(Angulo != null)//Este if se usa para generar un cuadro de texto alerta, para dar un mensaje dependiendo lo que el usuario interactue
    {
    alert("Su numero es "+ Angulo);
    }   
    else 
    {
    alert("No has escrito nada");
    }

    Delta= Dim/2;//Valor el lado inicial del cubo dividido en 2
    Diagonal=Math.sqrt(Math.pow(Delta,2)+Math.pow (Delta,2));//La diagonal es la variable que se usa para encontrar la longitud del centro del cubo, hacia el punto medio
    //Angulo=Math.PI/16;//Variable que proporciona el angulo de rotacion.
    Radianes=(Angulo)*((2*Math.PI)/(360));//Esta variable se usa para convertir de grados a radianes
    NewDelta=(Math.cos((Math.PI/4)-Radianes))*Diagonal;//Variable que determina el valor de traslacion que debe presentar el cubo

    Cubo.push(cubo(Dim, Dim, Dim, 0xFFDD00, 'Phong', false));//Se crea el primer cubo
    Cubo.push(cubo(Dim, Dim, Dim, 0x6FA8DC, 'Phong', false));//Se crea el segundo cubo
    Cubo.push(cubo(Dim, Dim, Dim, 0x0000FF, 'Lambert', false));//Se crea el tercer cubo
    
  
    for(i=0;i<3;i++)//Este for sirve para transaladar los cubos al origen de las coordenadas, es decir, al lugar indicado, el valor de delta
    {
         Cubo[i].translateX(NewDelta); //El metodo que use fue el Metodo translate 
         Cubo[i].translateY(Delta); //El metodo que use fue el Metodo translate
         Cubo[i].translateZ(NewDelta); //El metodo que use fue el Metodo translate
    } 

    
    for(i=1;i<3;i++) //Este for solo se toman los valores de 1 y 2 cubos, por lo tanto se trasladan hacia arriba mientras que tambirn su tamaño se escala a la mitad
    {
        Tamano=((1)/(Dim/(Delta/i)));//Varible para escalar el tamaño respeto al cubo indicado, es decir el valor de la mitad del cubo anterior.
        Altura=Dim/2+Dim/4+((((Dim/2)+(Dim/4))/2))*(i-1);//Altura Es una variable para cambiar la coordenada en y de los cubos. 
        Cubo[i].scale.set(Tamano,Tamano,Tamano); //Se escala las coordenas del cubo X,Y y Z que en este caso son la variable tamaño con un cambio pues se escala dos veces 
        Cubo[i].translateY(Altura);//El metodo que use fue el Metodo translate, con un parametro en este caso en la coordenada y 
    }
    for(i=0;i<3;i++)//Este for se utiliza para mover unicamente los cubos 0 y 2, con respecto al eje y
    {
        if(i==0 || i==2)
        {
            Cubo[i].rotateY(Radianes);
        }
    }
   
    
    //Luz (requerida para el material MeshLambertMaterial)
    light = new THREE.PointLight(0xFFFFFF); //  Luz proveniente de un punto en el espacio, 
                                            //  semejante al sol.
    light.position.set(-10, 50, 30);          //  Localización de la luz. (x, y, z).
    scene.add( light ); 

    //Posicione y apunte la camara al centro de la escena 
    camera.position.set(-3*Dim,4*Dim, 3*Dim);
    camera.lookAt(scene.position);

    //Agrega la salida del renderizador al elemento html
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render de la escena
    renderer.render(scene, camera);

}

