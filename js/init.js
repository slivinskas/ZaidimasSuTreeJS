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
							break;
					}
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
				// floor

                var loader = new THREE.TextureLoader();



                texture = THREE.ImageUtils.loadTexture('img/grass-free-texture.jpg', {}, function() {
                    renderer.render(scene);
                }),
				geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
				geometry.rotateX( - Math.PI / 2 );
				for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
					var vertex = geometry.vertices[ i ];
					vertex.x += Math.random() * 20 - 10;
					vertex.y += Math.random() * 2;
					vertex.z += Math.random() * 20 - 10;
				}
				for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
					var face = geometry.faces[ i ];
					face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				}

                material = new THREE.MeshBasicMaterial({map: texture}),
				//material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
				mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );


				// objects
				geometry = new THREE.BoxGeometry( 20, 20, 20 );

                material = new THREE.MeshBasicMaterial({
                    color: randomHex()
                });

             /*   loader = new THREE.JSONLoader();
                loader.load( "Eksportai/violin.json", function( geometry ) {
                    mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
                    mesh.scale.set( 10, 10, 10 );
                    mesh.position.y = 150;
                    mesh.position.x = 0;
                } );
                scene.add( mesh );/**/

				for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
					var face = geometry.faces[ i ];
				//	face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			//		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				//	face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				}


				for ( var i = 0; i < 500; i ++ ) {
				//	material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
					mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
					mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
                    mesh.rotation.y = -Math.PI/5;
					scene.add( mesh );
			//		material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
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
