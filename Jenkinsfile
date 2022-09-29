pipeline {
    agent any
   /*  parameters{
        string(name: 'name_container', defaultValue: 'proyecto-final', description: 'nombre del docker')
        string(name: 'name_imagen', defaultValue: 'iproyecto-final', description: 'nombre de la imagen')
        string(name: 'tag_imagen', defaultValue: 'latest', description: 'tag de la imagen')
        string(name: 'puerto_imagen', defaultValue: '81', description: 'puerto de la imagen')
    }

    environment {
        name_final = "${name_container}${tag_imagen}${puerto_imagen}"
    }
*/
    stages {

        stage('build'){
              
            steps{
                script{
                    docker.image('app-react', "./front-end")
                    def customImage = docker.build("handshake/appnode:${env.BUILD_ID}")
                }
                
                /*dir('front-end'){
                    sh ''
                }*/
            }
        }
        
        /*
        stage('test'){
            
        }

        stage('deploy'){
            
        }
        


        
        stage('stop/rm') {
            when{
                expression {
                    DOCKER_EXIST = sh(returnStdout: true, script: 'echo "$(docker ps -q --filter name=${name_final})"').trim()
                    return  DOCKER_EXIST != ''
                }
            }
            steps{
                script{
                    sh "docker stop ${name_final}"
                }
            }
        }

        stage('build'){
            steps{
                script{
                    sh "docker build jenkins/jobs/dockerweb/ -t ${name_imagen}:${tag_imagen}"
                }
            }
        } 

        stage('run'){
            steps{
                script{
                    sh "docker run -dtp ${puerto_imagen}:80 --name ${name_final} ${name_imagen}:${tag_imagen}"
                }
            }
        } 
        */
    }
    
}