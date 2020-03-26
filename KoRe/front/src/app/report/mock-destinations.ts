import { DestinationProtocole } from '../custom-classes'

export const DESTIATIONS = {
    [DestinationProtocole.SMTP]: [
        {
            email: 'toto.toto@toto.to',
            object: 'totoSub'
        }
    ],
    [DestinationProtocole.FTP]: [
        {
            user: 'toto',
            password: 'toto',
            host: 'toto_host',
            port: 1234,
            path: '~/folder'
        },
        {
            user: 'titi',
            password: 'titi',
            host: 'host_of_titi',
            port: 22,
            path: '~/my_costom_folder'
        }
    ],
    [DestinationProtocole.SFTP]: [],
    [DestinationProtocole.FOLDER]: [
        {
            path: '~/myFolder'
        }
    ]
};