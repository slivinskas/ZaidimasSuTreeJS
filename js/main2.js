var camera, scene, renderer;
var boxColors = [0xcc0000,0x2ca109,0x0f2e8d,0xff6600];
    mainColor = 0;
			var geometry, material, mesh;
			var controls;
			var objects = [];
			var raycaster;
			var blocker = document.getElementById( 'blocker' );
			var instructions = document.getElementById( 'instructions' );
			// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
			var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
			if ( havePointerLock ) {
				var element = document.body;
				var pointerlockchange = function ( event ) {
					if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
						controlsEnabled = true;
						controls.enabled = true;
						blocker.style.display = 'none';
					} else {
						controls.enabled = false;
						blocker.style.display = '-webkit-box';
						blocker.style.display = '-moz-box';
						blocker.style.display = 'box';
						instructions.style.display = '';
					}
				};
				var pointerlockerror = function ( event ) {
					instructions.style.display = '';
				};
				// Hook pointer lock state change events
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
				instructions.addEventListener( 'click', function ( event ) {
					instructions.style.display = 'none';
					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					if ( /Firefox/i.test( navigator.userAgent ) ) {
						var fullscreenchange = function ( event ) {
							if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
								document.removeEventListener( 'fullscreenchange', fullscreenchange );
								document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
								element.requestPointerLock();
							}
						};
						document.addEventListener( 'fullscreenchange', fullscreenchange, false );
						document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
						element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
						element.requestFullscreen();
					} else {
						element.requestPointerLock();
					}
				}, false );
			} else {
				instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
			}
			init();
			animate();
			var controlsEnabled = false;
			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			var canJump = false;
			var prevTime = performance.now();
			var velocity = new THREE.Vector3();
			function init() {
				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
				var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
				light.position.set( 0.5, 1, 0.75 );
				scene.add( light );
				controls = new THREE.PointerLockControls( camera );
				scene.add( controls.getObject() );
				var onKeyDown = function ( event ) {
					switch ( event.keyCode ) {
						case 38: // up
						case 87: // w
							moveForward = true;
							break;
						case 37: // left
						case 65: // a
							moveLeft = true; break;
						case 40: // down
						case 83: // s
							moveBackward = true;
							break;
						case 39: // right
						case 68: // d
							moveRight = true;
							break;
						case 32: // space
							if ( canJump === true ) velocity.y += 350;
							canJump = false;
                           // scene.getObjectByName( "kubas1" ).up.y += 10;
							break;
					}

                    //======================== Colision START ====================================
                    var objectsCount = objects.length;

                    var cameraLocal = new THREE.Vector3( 0, 0, 0 );
                    var cameraInWorld = cameraLocal.applyMatrix4( camera.matrixWorld );

                    var raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera( cameraInWorld, camera );
                    // calculate objects intersecting the picking ray
                    var intersects = raycaster.intersectObjects( objects );

                    for ( var inter = 0; inter < intersects.length; inter++ ) {
                        scene.remove( intersects[ inter ].object);
                    }

                    renderer.render( scene, camera );



               //     console.log("\n Kamera: ");
                  //  console.log(cameraInWorld); /**/

                    //======================= Collision END ======================================================

				};
				var onKeyUp = function ( event ) {
					switch( event.keyCode ) {
						case 38: // up
						case 87: // w
							moveForward = false;
							break;
						case 37: // left
						case 65: // a
							moveLeft = false;
							break;
						case 40: // down
						case 83: // s
							moveBackward = false;
							break;
						case 39: // right
						case 68: // d
							moveRight = false;
							break;
					}
				};
				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );
				raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

				// floor  =============================================================================================================
                var texture = new THREE.TextureLoader().load( "img/grass-free-texture.jpg" );

				geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
				geometry.rotateX( - Math.PI / 2 );
				for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
					var vertex = geometry.vertices[ i ];
					vertex.x += Math.random() * 20 - 10;
					vertex.y += Math.random() * 2;
					vertex.z += Math.random() * 20 - 10;
				}

                material = new THREE.MeshBasicMaterial({map: texture}),
				mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );

				// objects   =============================================================================================================

                var loader = new THREE.JSONLoader();
                    loader.load('./Eksportai/marmelab.json', function(geometry) {
                        mesh = new THREE.Mesh(geometry);
                        mesh.scale.set( 10, 10, 10 );
                        mesh.position.y = 150;
                        mesh.position.x = 0;
                        mesh.material.color.setHex(boxColors[mainColor]);
                        scene.add(mesh);
                    });

				geometry = new THREE.BoxGeometry( 20, 20, 20 );

                var matOfBox = Array();

                matOfBox[0] = new THREE.MeshBasicMaterial({
                    color: boxColors[0]
                });


                for(var colorNo = 1; colorNo < 4; colorNo++){
                    matOfBox[colorNo] = matOfBox[0].clone();
                    matOfBox[colorNo].color.setHex(boxColors[colorNo]);
                }/**/


				for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
					var face = geometry.faces[ i ];
				}


				for ( var i = 0; i < 40; i ++ ) {
				//	material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
                    var mesh = new THREE.Mesh( geometry, matOfBox[randomRange(0,3)] );
					mesh.position.x = Math.floor( Math.random() * 40 - 10 ) * 20;
					mesh.position.y = 10; //Math.floor( Math.random() * 20 ) * 20 + 10;
					mesh.position.z = Math.floor( Math.random() * 40 - 10 ) * 20;
                    mesh.rotation.y = -Math.PI/5;
					scene.add( mesh );
			//		material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
                    mesh.name = "kubas"+i.toString();
					objects.push( mesh );

				}

				//
				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0xffffff );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				if ( controlsEnabled ) {
					raycaster.ray.origin.copy( controls.getObject().position );
					raycaster.ray.origin.y -= 10;
					var intersections = raycaster.intersectObjects( objects );
					var isOnObject = intersections.length > 0;
					var time = performance.now();
					var delta = ( time - prevTime ) / 1000;
					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;
					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
					if ( moveForward ) velocity.z -= 400.0 * delta;
					if ( moveBackward ) velocity.z += 400.0 * delta;
					if ( moveLeft ) velocity.x -= 400.0 * delta;
					if ( moveRight ) velocity.x += 400.0 * delta;
					if ( isOnObject === true ) {
						velocity.y = Math.max( 0, velocity.y );
						canJump = true;
					}
					controls.getObject().translateX( velocity.x * delta );
					controls.getObject().translateY( velocity.y * delta );
					controls.getObject().translateZ( velocity.z * delta );
					if ( controls.getObject().position.y < 10 ) {
						velocity.y = 0;
						controls.getObject().position.y = 10;
						canJump = true;
					}
					prevTime = time;
				}
				renderer.render( scene, camera );
			}
            function randomRange(min, max) {
              return ~~(Math.random() * (max - min + 1)) + min
            }

            function randomHex(){
                return Math.floor(Math.random()*16777215);/*.toString(16);*/
            };
