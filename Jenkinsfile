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
        tag = 'app-react_v${env.BUILD_ID}'
        tag_latest = 'app-react_latest'
    }

    stages {

        stage('build'){
              
            steps{
                script{

                        
                    docker.withRegistry('', '${registryCredential}') {
                        def customImage = docker.build("${registry}:${tag}", "./front-end")
                        customImage.push()
                        customImage.push('${tag_latest}')
                    }
                    //docker.image('pahud/eks-kubectl-docker', "./front-end")
                    //def customImage = docker.build("${registry}:app-react_v${env.BUILD_ID}", "./front-end")
                    //customImage.push()
                    //customImage.push('latest')
                    //dir('front-end'){
                    //    sh 'docker build -t app-react .'
                    //}
                }
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