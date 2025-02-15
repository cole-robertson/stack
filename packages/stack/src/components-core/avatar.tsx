import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import styled from 'styled-components';
import { useDesign } from '..';
import { ColorPalette } from '../providers/design-provider';

const StyledAvatar = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px;
`;

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <StyledAvatar ref={ref} className={className} {...props} />
));
Avatar.displayName = 'Avatar';

const StyledAvatarImage = styled(AvatarPrimitive.Image)`
  aspect-ratio: 1 / 1;
  height: 100%;
  width: 100%;
`;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <StyledAvatarImage ref={ref} className={className} {...props} />
));
AvatarImage.displayName = 'AvatarImage';

const StyledAvatarFallback = styled(AvatarPrimitive.Fallback)<{
  $colors: ColorPalette,
}>`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  
  background-color: ${({ $colors }) => $colors.light.secondaryColor};

  html[data-stack-theme='dark'] & {
    background-color: ${({ $colors }) => $colors.dark.secondaryColor};
  }
`;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  const { colors } = useDesign();
  return <StyledAvatarFallback 
    ref={ref} 
    className={className} 
    $colors={colors}
    {...props} 
  />;
});
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
