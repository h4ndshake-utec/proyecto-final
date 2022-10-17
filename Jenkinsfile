pipeline {
    agent any
   /*  parameters{
        string(name: 'name_container', defaultValue: 'proyecto-final', description: 'nombre del docker')
        string(name: 'name_imagen', defaultValue: 'iproyecto-final', description: 'nombre de la imagen')
        string(name: 'tag_imagen', defaultValue: 'latest', description: 'tag de la imagen')
        string(name: 'puerto_imagen', defaultValue: '81', description: 'puerto de la imagen')
    }
*/
    environment {
        //name_final = "${name_container}${tag_imagen}${puerto_imagen}"
        registry = "h4ndshake/proyecto-final" 
        registryCredential = '6e04cdc9-c5fa-4486-83b7-2d6b05a127f7' 
        
    }

    stages {

        stage('build'){
              
            steps{
                script{
/*                      docker.withRegistry('', registryCredential) {
                        customImage = docker.build("${env.registry}:app-react_v${env.BUILD_ID}", "./front-end")
                    } */
                    sh 'docker compose up -d'
                }
            }
        }
        
        
         stage('test'){
            steps{
                dir('front-end'){
                    sh 'python3 tests.py'
                }
            }
        } 

        /* 
        stage('deploy'){
            steps{
                script{
                    docker.withRegistry('', registryCredential) {
                        //def customImage = docker.build("${env.registry}:app-react_v${env.BUILD_ID}", "./front-end")
                        customImage.push()
                        customImage.push('app-react_latest')
                    }
                    sh 'docker compose up -d'
                }
            }
        }*/
        
        /*

        
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