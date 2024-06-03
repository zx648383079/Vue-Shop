import {type Directive} from 'vue';
import { useTheme } from '../services/register';

export const TitleDirective: Directive<HTMLElement, string> = (el, binding) => {
    useTheme().setTitle(binding.value, el.getAttribute('img-set'));
}