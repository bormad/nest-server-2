import { Body, Heading, Link, Tailwind, Text } from '@react-email/components';
import { Html } from '@react-email/html';

interface ConfirmationTemplateProps {
	domain: string;
	token: string;
}

export function ConfirmationTemplate({
	domain,
	token,
}: ConfirmationTemplateProps) {
	const confirmLink = `http://localhost:4000/auth/new-verification?token=${token}`;

	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Подтверждение почты</Heading>
					<Text>
						Привет! Чтобы подтвердить свой адрес электронной почты,
						пожалуйста, перейдите по следующей ссылке:
					</Text>
					<Link href={confirmLink}>Подтвердить почту</Link>
					<Text>
						Эта ссылка действительна в течение 1 часа. Если вы не
						запрашивали подтверждение, просто проигнорируйте это
						сообщение.
					</Text>
				</Body>
			</Html>
		</Tailwind>
	);
}
