import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

export default function Bell({ color }) {
    const fullConfig = resolveConfig(tailwindConfig);
    const primaryColor = color || fullConfig.theme.colors.primary;

    return (
        <>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.75" stroke="#E9E9E9" strokeWidth="0.5" />
                <path d="M20.0175 12.4248C17.2591 12.4248 15.0175 14.6665 15.0175 17.4248V19.8331C15.0175 20.3415 14.8008 21.1165 14.5425 21.5498L13.5841 23.1415C12.9925 24.1248 13.4008 25.2165 14.4841 25.5831C18.0758 26.7831 21.9508 26.7831 25.5425 25.5831C26.5508 25.2498 26.9925 24.0581 26.4425 23.1415L25.4841 21.5498C25.2341 21.1165 25.0175 20.3415 25.0175 19.8331V17.4248C25.0175 14.6748 22.7675 12.4248 20.0175 12.4248Z" stroke={primaryColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M21.5579 12.6667C20.5502 12.3797 19.4824 12.3797 18.4746 12.6667C18.7163 12.05 19.3163 11.6167 20.0163 11.6167C20.7163 11.6167 21.3163 12.05 21.5579 12.6667Z" stroke={primaryColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.5176 25.8833C22.5176 27.2583 21.3926 28.3833 20.0176 28.3833C19.3342 28.3833 18.7009 28.1 18.2509 27.65C17.7827 27.1811 17.5191 26.5459 17.5176 25.8833" stroke={primaryColor} strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
        </>
    );
}
