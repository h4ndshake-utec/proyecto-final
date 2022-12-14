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
        registry = "h4ndshake/proyecto-final" 
        registryCredential = '6e04cdc9-c5fa-4486-83b7-2d6b05a127f7' 
        
    }

    stages {
        
        stage('generateImages'){
            steps{
                script{
                    docker.withRegistry('', registryCredential) {
                    def customImage = docker.build("${env.registry}:frontend_local_v${env.BUILD_ID}", ".")
                    customImage.push()
                    customImage.push('frontend_latest')
                    }
                    sh 'docker compose up -d'
                } 
            }
        }
        
    }
    
}